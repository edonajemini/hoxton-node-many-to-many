import Database from "better-sqlite3";
const db = Database("./db/data.db", {verbose:console.log})

function createApplicants () {
    const applicants = [
        {
            name: "Lara Hancock",
            age:22,
            position:"Receptionist"
        },
        {
            name: "Bryant Higgins",
            age:28,
            position:"Assistant Director"
        },
        {
            name: "Luna Johnson",
            age:26,
            position:"Office manager"
        },
        {
            name: "Conrad Sharp",
            age:31,
            position:"Purchasing manager"
        },
        {
            name: "Veronica Beck",
            age:34,
            position:"Operations manager"
        }
    ]
    const createApplicantsTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS applicants (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        position TEXT NOT NULL,
        PRIMARY KEY (id)
      );
    `)
    createApplicantsTable.run()

    const deleteApplicants = db.prepare(`
    DELETE from applicants;
    `)
    deleteApplicants.run()
    
    const creaateApplicants = db.prepare(`
    INSERT INTO applicants (name, age, position) VALUES (?,?,?);
    `)
    for (let applicant of applicants) {
        creaateApplicants.run(applicant.name, applicant.age, applicant.position)
    }
    }
function createInterviewers(){
    const interviewers = [
        {
            name: "Brantley Shelton",
            company:"Google"
        },
        {
            name: "Warner Parris",
            company:"Blackberry"
        },
        {
            name: "Amy Daley",
            company:"Securiteam"
        },
        {
            name: "Frederick Garland",
            company:"Technologent"
        }
    ]
    const createInterviewersTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviewers (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        PRIMARY KEY (id)
      );
    `)
    createInterviewersTable.run()
    
    const deleteInterviewers = db.prepare(`
    DELETE from interviewers;
    `)
    deleteInterviewers.run()
    
    const creaateInterviewers = db.prepare(`
    INSERT INTO interviewers (name, company) VALUES (?, ?);
    `)
    for (let interviewer of interviewers) {
        creaateInterviewers.run(interviewer.name, interviewer.company)
    }
    
}
function createInterviews(){
    const interviews = [
        {
            applicantsId: 1,
            interviewersId:2,
            time:"12/10/2022",
            place:""
        },
        {
            applicantsId: 2,
            interviewersId:3,
            time:"12/10/2022",
            place:""
        },
        {
            applicantsId: 3,
            interviewersId:1,
            time:"12/10/2022",
            place:""
        },
        {
            applicantsId: 4,
            interviewersId:2,
            time:"12/10/2022",
            place:""
        }
    ]
    const createInterviewstable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviews (
        id INTEGER NOT NULL,
        applicantsId INTEGER NOT NULL,
        interviewersId INTEGER NOT NULL,
        time TEXT NOT NULL,
        place TEXT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (applicantsId) REFERENCES applicants(id) ON DELETE CASCADE,
        FOREIGN KEY (interviewersId) REFERENCES interviewers(id) ON DELETE CASCADE
      );
    `)
    createInterviewstable.run()
    
    const deleteInterviews = db.prepare(`
    DELETE from Interviews;
    `)
    deleteInterviews.run()
    
    const creaateInterviews = db.prepare(`
    INSERT INTO interviews (applicantsId, interviewersId, time, place) VALUES (?,?,?,?);
    `)
    for (let interview of interviews) {
        creaateInterviews.run(interview.applicantsId, interview.interviewersId, interview.time, interview.place)
    }
    
}
createApplicants()
createInterviewers()
createInterviews()