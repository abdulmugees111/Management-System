import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Row,
  ProjectCard,
  UserAvatar,
  Col,
  PaginationComponent,
  RSelect,
} from "../../../components/Component";
// import { projectData, teamList } from "./ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../../utils/Utils";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  FormGroup,
  Progress,
  DropdownItem,
  Form,
  Card,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ProjectCardPage = ({projects, history}) => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    add: false,
    edit: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(9);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      lead: "",
      tasks: 0,
      totalTask: 0,
      team: [],
      date: new Date(),
    });
  };

  // function to close the modal
  const onFormCancel = () => {
    setModal({ add: false }, { edit: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData = {
      id: data.length + 1,
      avatarClass: "pink",
      title: title,
      subtitle: subtitle,
      desc: description,
      lead: formData.lead,
      team: formData.team,
      tasks: tasks,
      totalTask: totalTask,
      deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
    };
    setData((data) => [submittedData, ...data]);
    resetForm();
    setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarClass: item.avatarClass,
          title: title,
          subtitle: subtitle,
          desc: description,
          lead: formData.lead,
          tasks: tasks,
          totalTask: totalTask,
          deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
          team: formData.team,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          title: item.title,
          subtitle: item.subtitle,
          description: item.desc,
          lead: item.lead,
          team: item.team,
          tasks: item.tasks,
          totalTask: item.totalTask,
          date: item.deadline,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // Get current list, pagination
  // const indexOfLastItem = currentPage * itemPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Project Card"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> My Subscriptions </BlockTitle>
              <BlockDes className="text-soft">You have total {data && data.length} subscriptions </BlockDes>
            </BlockHeadContent>
            <Col md='6'>
            {/*<div className="form-control-wrap">*/}
            {/*  <input  className="form-control form-control-lg" type="text" id="default-0" placeholder="Search projects"*/}
            {/*      onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*  />*/}
            {/*</div>*/}
            </Col>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add Subscription</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          {
            data &&
            data.map((project, idx) => {
              return(<Card className="card-bordered sp-plan">
                <Row className="no-gutters">
                  <Col className="col-md-8">
                    <div className="sp-plan-info card-inner">
                      <Row className="gx-0 gy-3">
                        <div className="col-xl-9 col-sm-8">
                          <div className="sp-plan-name">
                            <h6 className="title">
                              <Link to={`/project/${project.app_name}`}>{project.name}
                              <span className="badge bg-success rounded-pill">Active</span></Link>
                            </h6>
                            <p>project ID: <span className="text-base">{project.app_name}</span></p>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-4">
                          <div className="sp-plan-opt">
                            <div className="custom-control custom-switch checked"><label
                              className="custom-control-label text-soft" htmlFor="auto-plan-p1">Auto Renew</label></div>
                          </div>
                        </div>
                      </Row>
                    </div>
                    <div className="sp-plan-desc card-inner">
                      <ul className="row gx-1">
                        <li className="col-6 col-lg-3"><p><span className="text-soft">Started On</span> Oct 12, 2018</p>
                        </li>
                        <li className="col-6 col-lg-3"><p><span className="text-soft">Recuring</span> Yes</p></li>
                        <li className="col-6 col-lg-3"><p><span className="text-soft">Price</span> $599.00</p></li>
                        <li className="col-6 col-lg-3"><p><span className="text-soft">Access</span> Unlimited</p></li>
                      </ul>
                    </div>
                  </Col>
                  <div className="col-md-4">
                    <div className="sp-plan-action card-inner">
                      <div className="sp-plan-btn"><a className="btn btn-primary" data-bs-toggle="modal"
                                                      href="#subscription-change"><span>Change Plan</span></a></div>
                      <div className="sp-plan-note text-md-center"><p>Next Billing on <span>Oct 11, 2020</span></p>
                      </div>
                    </div>
                  </div>
                </Row>
              </Card>)
            })
          }
          <br/>
          <br/>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Project</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={formData.title}
                        placeholder="Enter Title"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Client</label>
                      <input
                        type="text"
                        name="subtitle"
                        defaultValue={formData.subtitle}
                        placeholder="Enter client name"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.subtitle && <span className="invalid">{errors.subtitle.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Number of Tasks</label>
                      <input
                        type="number"
                        name="tasks"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        name="totalTask"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.totalTask && <span className="invalid">{errors.totalTask.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Deadline Date</label>
                      <DatePicker
                        selected={formData.date}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, date: date })}
                        minDate={new Date()}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Team Members</label>
                      <RSelect options={teamList} isMulti onChange={(e) => setFormData({ ...formData, team: e })} />
                    </FormGroup>
                  </Col> */}
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Lead</label>
                      <RSelect options={formData.team} onChange={(e) => setFormData({ ...formData, lead: e.value })} />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add Project
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Project</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={formData.title}
                        placeholder="Enter Title"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Client</label>
                      <input
                        type="text"
                        name="subtitle"
                        defaultValue={formData.subtitle}
                        placeholder="Enter client name"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                      />
                      {errors.subtitle && <span className="invalid">{errors.subtitle.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This field is required" })}
                        className="form-control no-resize"
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Number of Tasks</label>
                      <input
                        type="number"
                        name="tasks"
                        defaultValue={formData.tasks}
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                      />
                      {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        name="totalTask"
                        defaultValue={formData.totalTask}
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                      />
                      {errors.totalTask && <span className="invalid">{errors.totalTask.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Deadline Date</label>
                      <DatePicker
                        selected={formData.date}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, date: date })}
                        minDate={new Date()}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Team Members</label>
                      <RSelect
                        options={teamList}
                        isMulti
                        defaultValue={formData.team}
                        onChange={(e) => setFormData({ ...formData, team: e })}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Lead</label>
                      <RSelect
                        options={formData.team}
                        defaultValue={[{ value: formData.lead, label: formData.lead }]}
                        onChange={(e) => setFormData({ ...formData, lead: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Project
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default ProjectCardPage;
