import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> My data </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="timestamp">Time Stamp</Label>
              <Input
                type="text"
                id="timestamp"
                name="time_stamp"
                value={this.state.activeItem.time_stamp}
                onChange={this.handleChange}
                placeholder="Enter Time Stamp"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sipcallingparty">Sip Calling Party</Label>
              <Input
                type="text"
                id="sipcallingparty"
                name="sip_calling_party"
                value={this.state.activeItem.sip_calling_party}
                onChange={this.handleChange}
                placeholder="Enter Sip Calling Party"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sipcalledparty">Sip Called Party</Label>
              <Input
                type="text"
                id="sipcalledparty"
                name="sip_called_party"
                defaultValue={this.state.activeItem.sip_called_party}
                onChange={this.handleChange}
                placeholder="Enter Sip Called Party"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sipcallduration">Sip Call Duration</Label>
              <Input
                type="text"
                id="sipcallduration"
                name="sip_call_duration"
                defaultValue={this.state.activeItem.sip_call_duration}
                onChange={this.handleChange}
                placeholder="Enter Sip Call Duration"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sipcallstatus">Sip Call Status</Label>
              <Input
                type="text"
                id="sipcallstatus"
                name="sip_call_status"
                defaultValue={this.state.activeItem.sip_call_status}
                onChange={this.handleChange}
                placeholder="Enter Sip Call Status"
              />
            </FormGroup>
            <FormGroup>
              <Label for="siprtpl4srcport">Sip Rtp L4 Src Port</Label>
              <Input
                type="text"
                id="siprtpl4srcport"
                name="sip_rtp_l4_src_port"
                defaultValue={this.state.activeItem.sip_rtp_l4_src_port}
                onChange={this.handleChange}
                placeholder="Enter Sip Rtp L4 Src Port"
              />
            </FormGroup>
            <FormGroup>
              <Label for="siprtpl4dstport">Sip Rtp L4 Dst Port</Label>
              <Input
                type="text"
                id="siprtpl4dstport"
                name="sip_rtp_l4_dst_port"
                defaultValue={this.state.activeItem.sip_rtp_l4_dst_port}
                onChange={this.handleChange}
                placeholder="Enter Sip Rtp L4 Dst Port"
              />
            </FormGroup>
            <FormGroup>
              <Label for="rtpinjitter">Rtp In Jitter</Label>
              <Input
                type="text"
                id="rtpinjitter"
                name="rtp_in_jitter"
                defaultValue={this.state.activeItem.rtp_in_jitter}
                onChange={this.handleChange}
                placeholder="Enter Rtp In Jitter"
              />
            </FormGroup>
            <FormGroup>
              <Label for="rtpinmos">Rtp In Mos</Label>
              <Input
                type="text"
                id="rtpinmos"
                name="rtp_in_mos"
                defaultValue={this.state.activeItem.rtp_in_mos}
                onChange={this.handleChange}
                placeholder="Enter Rtp In Mos"
              />
            </FormGroup>
            <FormGroup>
              <Label for="pktlossper">Pkt Loss Per</Label>
              <Input
                type="text"
                id="pktlossper"
                name="pkt_loss_per"
                defaultValue={this.state.activeItem.pkt_loss_per}
                onChange={this.handleChange}
                placeholder="Enter Pkt Loss Per"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sipcallingreg">Sip Calling Reg</Label>
              <Input
                type="text"
                id="sipcallingreg"
                name="sip_calling_reg"
                value={this.state.activeItem.sip_calling_reg}
                onChange={this.handleChange}
                placeholder="Enter Sip Calling Reg"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sipcalledreg">Sip Called Reg</Label>
              <Input
                type="text"
                id="sipcalledreg"
                name="sip_called_reg"
                defaultValue={this.state.activeItem.sip_called_reg}
                onChange={this.handleChange}
                placeholder="Enter Sip Called Reg"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
