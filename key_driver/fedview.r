library(reshape2)
library(glmnet)
library(splitstackshape)


setwd('~/Data/FedView/FEVS2015_PRDF_CSV/')


remove_non_numeric <- function(data){
  for(i in 5:75){
    if(is.numeric(data[,i]))
      next

    c <- names(data)[i]
    print( paste('Converting',c) )
    print(summary(data[,i]))

    data[[c]][ data[[c]] == 'X' ] <- NA
    data[[c]] <- as.numeric(data[[c]])
    data[[c]] <- data[[c]] - 1
    data[[c]][ data[[c]] == 0 ] <- NA

    print(xtabs(~ data[,i]))
  }
  data
}

summarize_qs <- function(data){
  summary_data <- NULL
  for(j in 5:75){

    c <- names(data)[j]

    d <- as.data.frame( table(data[[c]]) )
    names(d)[1] <- 'val'
    d$val <- as.numeric(d$val)

    if(dim(d)[1] < 5){
      for(v in 1:5){
        if(length( d$val[d$val == v] ) < 1 )
          d <- rbind(d, c(v,0) )
      }
    }

    d$q <- c

    d <- dcast(d, q ~ val, value.var = 'Freq')


    d$mean <- mean(data[[c]], na.rm = T)
    d$sd <- sd(data[[c]], na.rm = T)
    d$n <- sum(d[2:6])

    summary_data <- rbind(summary_data, d)
  }
  summary_data
}




data <- read.csv('~/Data/FedView/FEVS2015_PRDF_CSV/evs2015_PRDF.csv')
names(data) <- tolower(names(data))
data <- remove_non_numeric(data)
head(data)




key_driver_by <- function(data, column){
  agencies <- sort( unique(data[[column]]) )

  for(i in i:length(agencies)){
    a <- agencies[i]

    # data_a <- subset(data, agency %in% a )
    data_a <- data[ data[[column]] == a ,]

    summary_data <- summarize_qs(data_a)

    data_a.model <-  na.omit( data_a[,c(1,5:73)] )
    model_matrix <- model.matrix(q69 ~ . - postwt, data=data_a.model)
    model_matrix <- model_matrix[,2:dim(model_matrix)[2]]
    cvfit <- cv.glmnet(model_matrix, data_a.model$q69, data_a.model$postwt, family='gaussian')

    reg <- coef(cvfit, s='lambda.1se', exact=TRUE)
    reg <- as.data.frame(as.matrix(reg))
    names(reg)[1] <- 'coeff'
    reg$q <- row.names(reg)
    reg$coeff[ reg$coeff == 0 ] <- NA


    key_driver_i <- merge(
      summary_data,
      reg,
      by = c('q'),
      all.x = T,
      all.y = F
    )

    write.csv(key_driver_i, file=paste('~/GitHub/econsys.github.io/key_driver/data/','key_driver_', tolower(a),'.csv', sep=''), row.names = FALSE, na = '')
  }
}


key_driver_by(data, 'agency')
key_driver_by(data, 'plevel1')






agencies <- sort( unique(data$agency) )
data_a <- subset(data, agency %in% 'VA')
data_a.model <-  na.omit( data_a[,c(1,5:75)] )

data_a.model_expanded <-  expandRows(data_a.model, 'postwt')

data_a.factor <- data_a.model_expanded[,!names(data_a.model_expanded) %in% c('q69') ]

fit <- princomp(data_a.factor, cor=TRUE)
fit <- principal(data_a.factor, nfactors=10, rotate="varimax")

ev <- eigen(cor(data_a.factor )) # get eigenvalues
ap <- parallel(subject=nrow(data_a.factor ),var=ncol(data_a.factor ),rep=100,cent=.05)
nS <- nScree(x=ev$values, aparallel=ap$eigen$qevpea)
plotnScree(nS)

fact_fit <- 

