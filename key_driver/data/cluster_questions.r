questions <- list(
  q1 = "I am given a real opportunity to improve my skills in my organization.",
  q2 = "I have enough information to do my job well.",
  q3 = "I feel encouraged to come up with new and better ways of doing things.",
  q4 = "My work gives me a feeling of personal accomplishment.",
  q5 = "I like the kind of work I do.",
  q6 = "I know what is expected of me on the job.",
  q7 = "When needed I am willing to put in the extra effort to get a job done.",
  q8 = "I am constantly looking for ways to do my job better.",
  q9 = "I have sufficient resources (for example, people, materials, budget) to get my job done.",
  q10 = "My workload is reasonable.",
  q11 = "My talents are used well in the workplace.",
  q12 = "I know how my work relates to the agency's goals and priorities.",
  q13 = "The work I do is important.",
  q14 = "Physical conditions (for example, noise level, temperature, lighting, cleanliness in the workplace) allow employees to perform their jobs well.",
  q15 = "My performance appraisal is a fair reflection of my performance.",
  q16 = "I am held accountable for achieving results.",
  q17 = "I can disclose a suspected violation of any law, rule or regulation without fear of reprisal.",
  q18 = "My training needs are assessed.",
  q19 = "In my most recent performance appraisal, I understood what I had to do to be rated at different performance levels (for example, Fully Successful, Outstanding).",
  q20 = "The people I work with cooperate to get the job done.",
  q21 = "My work unit is able to recruit people with the right skills.",
  q22 = "Promotions in my work unit are based on merit.",
  q23 = "In my work unit, steps are taken to deal with a poor performer who cannot or will not improve.",
  q24 = "In my work unit, differences in performance are recognized in a meaningful way.",
  q25 = "Awards in my work unit depend on how well employees perform their jobs.",
  q26 = "Employees in my work unit share job knowledge with each other.",
  q27 = "The skill level in my work unit has improved in the past year.",
  q28 = "How would you rate the overall quality of work done by your work unit?",
  q29 = "The workforce has the job-relevant knowledge and skills necessary to accomplish organizational goals.",
  q30 = "Employees have a feeling of personal empowerment with respect to work processes.",
  q31 = "Employees are recognized for providing high quality products and services.",
  q32 = "Creativity and innovation are rewarded.",
  q33 = "Pay raises depend on how well employees perform their jobs.",
  q34 = "Policies and programs promote diversity in the workplace (for example, recruiting minorities and women, training in awareness of diversity issues, mentoring).",
  q35 = "Employees are protected from health and safety hazards on the job.",
  q36 = "My organization has prepared employees for potential security threats.",
  q37 = "Arbitrary action, personal favoritism and coercion for partisan political purposes are not tolerated.",
  q38 = "Prohibited Personnel Practices (for example, illegally discriminating for or against any employee/applicant, obstructing a person's right to compete for employment, knowingly violating veterans' preference requirements) are not tolerated.",
  q39 = "My agency is successful at accomplishing its mission.",
  q40 = "I recommend my organization as a good place to work.",
  q41 = "I believe the results of this survey will be used to make my agency a better place to work.",
  q42 = "My supervisor supports my need to balance work and other life issues.",
  q43 = "My supervisor provides me with opportunities to demonstrate my leadership skills.",
  q44 = "Discussions with my supervisor about my performance are worthwhile.",
  q45 = "My supervisor is committed to a workforce representative of all segments of society.",
  q46 = "My supervisor provides me with constructive suggestions to improve my job performance.",
  q47 = "Supervisors in my work unit support employee development.",
  q48 = "My supervisor listens to what I have to say.",
  q49 = "My supervisor treats me with respect.",
  q50 = "In the last six months, my supervisor has talked with me about my performance.",
  q51 = "I have trust and confidence in my supervisor.",
  q52 = "Overall, how good a job do you feel is being done by your immediate supervisor?",
  q53 = "In my organization, senior leaders generate high levels of motivation and commitment in the workforce.",
  q54 = "My organization's senior leaders maintain high standards of honesty and integrity.",
  q55 = "Supervisors work well with employees of different backgrounds.",
  q56 = "Managers communicate the goals and priorities of the organization.",
  q57 = "Managers review and evaluate the organization's progress toward meeting its goals and objectives.",
  q58 = "Managers promote communication among different work units (for example, about projects, goals, needed resources).",
  q59 = "Managers support collaboration across work units to accomplish work objectives.",
  q60 = "Overall, how good a job do you feel is being done by the manager directly above your immediate supervisor?",
  q61 = "I have a high level of respect for my organization's senior leaders.",
  q62 = "Senior leaders demonstrate support for Work/Life programs.",
  q63 = "How satisfied are you with your involvement in decisions that affect your work?",
  q64 = "How satisfied are you with the information you receive from management on what's going on in your organization?",
  q65 = "How satisfied are you with the recognition you receive for doing a good job?",
  q66 = "How satisfied are you with the policies and practices of your senior leaders?",
  q67 = "How satisfied are you with your opportunity to get a better job in your organization?",
  q68 = "How satisfied are you with the training you receive for your present job?",
  q69 = "Considering everything, how satisfied are you with your job?",
  q70 = "Considering everything, how satisfied are you with your pay?",
  q71 = "Considering everything, how satisfied are you with your organization?"
)

stop_words <- c("a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves")






function()
l2_qs <- tolower( questions[ names(questions) %in% l2_names] )
l2_qs <- gsub('\\.|\\?|,|(\'s)','', l2_qs)
l2_qs <- strsplit(l2_qs,' ')

for(i in 1:length(l2_qs)){
  l2_qs[[i]] <- l2_qs[[i]][!l2_qs[[i]]%in% stop_words]
}



terms <- unique(unlist(l2_qs))
term_counts <- list()

for(i in 1:length(terms)){
  t <- terms[i]
  term_counts[[t]] <- 0

  for(i in 1:length(l2_qs)){
    if(t %in% l2_qs[[i]])
      term_counts[[t]] <- term_counts[[t]] + 1
  }
}