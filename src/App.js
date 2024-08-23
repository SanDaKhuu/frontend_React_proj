import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Chart } from "react-google-charts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      modal: false,
      activeItem: {
        time_stamp: "",
        sip_calling_party: "",
        sip_called_party: "",
        sip_call_duration: "",
        sip_call_status: "",
        sip_rtp_l4_src_port: "",
        sip_rtp_l4_dst_port: "",
        rtp_in_jitter: "",
        rtp_in_mos: "",
        pkt_loss_per: "",
        sip_calling_reg: "",
        sip_called_reg: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/books/")
      .then((res) => this.setState({ bookList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/books/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post("/api/books/", item).then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios.delete(`/api/books/${item.id}/`).then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {
      time_stamp: "",
      sip_calling_party: "",
      sip_called_party: "",
      sip_call_duration: "",
      sip_call_status: "",
      sip_rtp_l4_src_port: "",
      sip_rtp_l4_dst_port: "",
      rtp_in_jitter: "",
      rtp_in_mos: "",
      pkt_loss_per: "",
      sip_calling_reg: "",
      sip_called_reg: "",
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    return this.state.bookList.map((item, id) => (
      <tr key={id}>
        <td> {id + 1}</td>
        <td className="time-stamp mr-2">{item.time_stamp}</td>
        <td className="sip-calling-value mr-2">
          {item.sip_calling_party.split("@")[0].split(":")[1]}
        </td>
        <td className="sip-calling-ip-address mr-2">
          {item.sip_calling_party.split("@")[1].replace(">", "")}
        </td>
        <td className="sip-called-value mr-2">
          {item.sip_called_party.split("@")[0].split(":")[1]}
        </td>
        <td className="sip-called-ip-address mr-2">
          {item.sip_called_party.split("@")[1].replace(">", "")}
        </td>
        <td className="sip-call-duration mr-2">{item.sip_call_duration}</td>
        <td className="sip-call-status mr-2">{item.sip_call_status}</td>
        <td className="sip-rtp_l4-src-port mr-2">{item.sip_rtp_l4_src_port}</td>
        <td className="sip-rtp_l4-dst-port mr-2">{item.sip_rtp_l4_dst_port}</td>
        <td className="rtp-in-jitter mr-2">{item.rtp_in_jitter}</td>
        <td className="rtp_in_mos mr-2">{item.rtp_in_mos}</td>
        <td className="pkt-loss-per mr-2">{item.pkt_loss_per}</td>
        <td className="sip-calling-reg mr-2">{item.sip_calling_reg}</td>
        <td className="sip-called-reg mr-2">{item.sip_called_reg}</td>

        <td>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  countStatus = (type) => {
    const countStatus = this.state.bookList.filter(
      (item) => item.sip_call_status === type
    );
    return countStatus.length;
  };

  pieData = () => {
    const pie = [
      ["Status", "Count"],
      ["COMPLETED", this.countStatus("COMPLETED")],
      ["FAILED", this.countStatus("FAILED")],
    ];
    return pie;
  };

  render() {
    return (
      <div className="container d-flex align-items-center justify-content-center">
        <main>
          <h1 className="text-uppercase text-center my-4">My Data</h1>
          <div className="card p-3">
            <div className="row">
              <div className="col-1"></div>
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add Data
                </button>
              </div>
              <div className="col-1"></div>
              <div className="mb-4">
                <button className="btn btn-success">Import JSON File</button>
              </div>
            </div>
            <table className="table mt-5 align-items-center justify-content-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Time Stamp</th>
                  <th scope="col">Sip Calling Value</th>
                  <th scope="col">Sip Calling IP Address</th>
                  <th scope="col">Sip Called Value</th>
                  <th scope="col">Sip Called IP Address</th>
                  <th scope="col">Sip Call Duration</th>
                  <th scope="col">Sip Call Status</th>
                  <th scope="col">Sip Rtp L4 Src Port</th>
                  <th scope="col">Sip Rtp L4 Dst Port</th>
                  <th scope="col">Rtp In Jitter</th>
                  <th scope="col">Rtp In Mos</th>
                  <th scope="col">Pkt Loss Per</th>
                  <th scope="col">Sip Calling Reg</th>
                  <th scope="col">Sip Called Reg</th>
                </tr>
              </thead>

              <tbody>{this.renderItems()}</tbody>
            </table>
            <h3>Line Chart</h3>
            <br /> <br />
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={this.state.bookList} margin={{ right: 300 }}>
                <CartesianGrid />
                <XAxis
                  dataKey="sip_call_duration"
                  label="Sip Call Duration"
                  reversed
                />
                <YAxis></YAxis>
                <Legend />
                <Tooltip />
                <Line
                  dataKey="rtp_in_mos"
                  stroke="black"
                  activeDot={{ r: 8 }}
                />
                <Line
                  dataKey="pkt_loss_per"
                  stroke="red"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <br /> <br />
            <h3>Pie Chart</h3>
            <br /> <br /> <br />
            <Chart
              chartType="PieChart"
              data={this.pieData()}
              options={{ title: "Sip Call Status Pie" }}
              width={"100%"}
              height={"400px"}
            />
            {console.log(this.pieData())}
          </div>

          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </main>
      </div>
    );
  }
}

export default App;
