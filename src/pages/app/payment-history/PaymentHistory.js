import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Card,
  FormGroup,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
  Badge,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  PaginationComponent,
  Row,
  RSelect,
} from "../../../components/Component";
import { statusOptions, paymentData } from "./Invoice";
import { dateFormatterAlt } from "../../../utils/Utils";
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import { get_invoices } from "../../../services/invoice";
import { Link } from "react-router-dom";

const PaymentHistory = () => {
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    add: false,
  });
  const [viewModal, setViewModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [data, setData] = useState(paymentData);
  const [formData, setFormData] = useState({
    bill: "",
    issue: new Date(),
    due: new Date(),
    total: "",
    status: "",
    ref: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");

  const sortingFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = [...defaultData].sort((a, b) => parseFloat(a.ref) - parseFloat(b.ref));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = [...defaultData].sort((a, b) => parseFloat(b.ref) - parseFloat(a.ref));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = paymentData.filter((item) => {
        return item.bill.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...paymentData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      bill: "",
      issue: new Date(),
      due: new Date(),
      total: "",
      status: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { bill, total } = submitData;
    
    let submittedData = {
      id: data.length + 1,
      ref: 4970 + data.length,
      bill: bill,
      issue: dateFormatterAlt(formData.issue, true),
      due: dateFormatterAlt(formData.due, true),
      total: total + ".00",
      status: formData.status,
    };
    setData([submittedData, ...data]);

    resetForm();
    setModal({ add: false });
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setDetail(data[index]);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  const { isLoading, error, data:invoices } = useQuery(["get-invoices"], get_invoices);
  return (
    <React.Fragment>
      <Head title="Payment History"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Payment History</BlockTitle>
              <BlockDes className="text-soft">
                <p>Here is payment history of your account.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              
              <div className="card-inner p-0">
                <table className="table table-tranx">
                  <thead>
                    <tr className="tb-tnx-head">
                      <th className="tb-tnx-id">
                        <span className="">Name</span>
                      </th>
                      <th className="tb-tnx-info">
                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                          <span>Payment Reference</span>
                        </span>
                        <span className="tb-tnx-date d-md-inline-block d-none">
                          <span className="d-none d-md-block">
                            <span>invoice date</span>
                          </span>
                        </span>
                      </th>
                      <th className="tb-tnx-amount is-alt">
                        <span className="tb-tnx-status d-none d-md-inline-block">State</span>
                      </th>
                      {/*<th className="tb-tnx-action">*/}
                      {/*  <span>&nbsp;</span>*/}
                      {/*</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices && invoices.count > 0
                      ? invoices.results.map((item) => {
                          return (
                            <tr key={item.id} className="tb-tnx-item">
                              <td className="tb-tnx-id">
                                <Link to={`/invoice/${item.id}`}>
                                  <span>{item.name}</span>
                                </Link>
                              </td>
                              <td className="tb-tnx-info">
                                <div className="tb-tnx-desc">
                                  <span className="title">{item.payment_reference}</span>
                                </div>
                                <div className="tb-tnx-date">
                                  <span className="date">{item.invoice_date}</span>
                                </div>
                              </td>
                              <td className="tb-tnx-amount is-alt">
                                <div className="tb-tnx-status">
                                  <span
                                    className={`badge badge-dot badge-${
                                      item.state === "posted" ? "success" : item.state === "Due" ? "warning" : "danger"
                                    }`}
                                  >
                                    {item.state}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Block>


        <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                setViewModal(false);
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Transaction <small className="text-primary">#{detail.ref}</small>
              </h4>
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Order ID</span>
                  <span className="caption-text">{detail.ref}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Bill </span>
                  <span className="caption-text text-break">{detail.bill}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Transaction Fee</span>
                  <span className="caption-text">$ {detail.total}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Status</span>
                  <Badge
                    color={detail.status === "Paid" ? "success" : detail.status === "Due" ? "warning" : "danger"}
                    size="md"
                  >
                    {detail.status}
                  </Badge>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Issue Date</span>
                  <span className="caption-text"> {detail.issue}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Due Date</span>
                  <span className="caption-text"> {detail.due}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default PaymentHistory;