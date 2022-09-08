import express from "express"
import cors from "cors"
import Database from 'better-sqlite3'
const db = Database('./db/data.db', { verbose: console.log })

const app = express()
app.use(cors())
app.use(express.json())
const port = 4000

app.get('/', (req, res) => {
    res.send(`
    <ul>
    <li><a href="/applicants">Applicants</a></li>
    <li><a href="/interviewers">Interviewers</a></li>
    <li><a href="/interviews">Interviews</a></li>
    </ul>
    `)
  })
  
 
  const getApplicants = db.prepare(`
  SELECT * FROM applicants;
  `)
  const getInterviewers = db.prepare(`
  SELECT * FROM interviewers;
  `)
  
  const getApplicantsById = db.prepare(`
  SELECT * FROM applicants WHERE id = ?;
  `)
  const getInterviewersById = db.prepare(`
SELECT * FROM interviewers WHERE id = ?;
`)
  const getInterviewsForApplicants = db.prepare(`
  SELECT * FROM interviews WHERE applicantsId = ?;
  `)
  const getInterviewersForApplicants = db.prepare(`
  SELECT interviewers.* FROM interviewers
  JOIN interviews ON interviewers.id = interviews.interviewersId
  WHERE interviews.interviewersId = ?;
  `)
  const getApplicantsForInterviewers = db.prepare(`
SELECT applicants.* FROM applicants
JOIN interviews ON applicants.id = interviews.applicantsId
WHERE interviews.applicantsId = ?;
`)
  

//get applicants 
  app.get('/applicants', (req, res) => {
    const applicants = getApplicants.all()
    for(let applicant of applicants){
        const interviewers = getInterviewersForApplicants.all(applicant.id)
        applicant.interviewers = interviewers
    }
    res.send(applicants)
  })

  //get applicants by id
  app.get('/applicants/:id', (req, res) => {
    const id = Number(req.params.id)
  const applicant = getApplicantsById.get(id)
    if (applicant) {
        applicant.interviews = getInterviewsForApplicants.all(applicant.id)
        applicant.interviewers = getInterviewersForApplicants.all(applicant.id)
      res.send(applicant)
    } else {
      res.status(404).send({ error: 'Applicants not found' })
    }
  })

  //get Interviewers
  app.get('/interviewers', (req, res) => {
      const interviewers = getInterviewers.all()
      for(let interviewer of interviewers){
        const applicants = getApplicantsForInterviewers.all(interviewer.id)
        interviewer.applicants = applicants
    }
      res.send(interviewers)
  })

  //get Interviewers by Id
app.get('/interviewers/:id', (req, res) => {
    const id = Number(req.params.id)
  const interviewer = getInterviewersById.get(id)
    if (interviewer) {
        interviewer.applicants = getApplicantsForInterviewers.all(interviewer.id)
      res.send(interviewer)
    } else {
      res.status(404).send({ error: 'Interviewer not found' })
    }
  })

 
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  
