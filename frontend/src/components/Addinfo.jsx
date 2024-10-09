import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
// import { Form } from "react-router-dom";

function Addinfo({
  showAddInfoModal,
  handleCloseAddInfo,
  handleAddEducation,
  education,
  setEducation,
  handleAddWorkExperience,
  workExperience,
  setWorkExperience,
  handleAddSkills,
  skills,
  setSkills,
  handleChangeUser,
}) {
  return (
    <Modal show={showAddInfoModal} onHide={handleCloseAddInfo}>
      <Modal.Header closeButton>
        <Modal.Title>Add More Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Add Education</h5>
        <Form onSubmit={handleAddEducation}>
          <Form.Group controlId="formDegreeTitle">
            <Form.Label>Degree Title</Form.Label>
            <Form.Control
              type="text"
              value={education.degreeTitle}
              onChange={(e) =>
                setEducation({ ...education, degreeTitle: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formInstituteName">
            <Form.Label>Institute Name</Form.Label>
            <Form.Control
              type="text"
              value={education.instituteName}
              onChange={(e) =>
                setEducation({ ...education, instituteName: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formMajorSubjects">
            <Form.Label>Major Subjects</Form.Label>
            <Form.Control
              type="text"
              value={education.majorSubjects}
              onChange={(e) =>
                setEducation({ ...education, majorSubjects: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={education.startDate}
              onChange={(e) =>
                setEducation({ ...education, startDate: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={education.endDate}
              onChange={(e) =>
                setEducation({ ...education, endDate: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Education
          </Button>
        </Form>

        <h5 className="mt-4">Add Work Experience</h5>
        <Form onSubmit={handleAddWorkExperience}>
          <Form.Group controlId="formWorkTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              value={workExperience.title}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  title: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formOrganization">
            <Form.Label>Organization</Form.Label>
            <Form.Control
              type="text"
              value={workExperience.organization}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  organization: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formFromDate">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              value={workExperience.fromDate}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  fromDate: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formToDate">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              value={workExperience.toDate}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  toDate: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formJobDescription">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={workExperience.jobDescription}
              onChange={(e) =>
                setWorkExperience({
                  ...workExperience,
                  jobDescription: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Work Experience
          </Button>
        </Form>

        <h5 className="mt-4">Add Skills</h5>
        <Form onSubmit={handleAddSkills}>
          <Form.Group controlId="formSkillTitle">
            <Form.Label>Skill Title</Form.Label>
            <Form.Control
              type="text"
              value={skills.skilltitle}
              onChange={(e) =>
                setSkills({ ...skills, skilltitle: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formSkillLevel">
            <Form.Label>Skill Level</Form.Label>
            <Form.Control
              type="text"
              value={skills.skillLevel}
              onChange={(e) =>
                setSkills({ ...skills, skillLevel: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Skill
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Addinfo;
