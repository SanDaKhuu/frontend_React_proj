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
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const target = e.target;
      const result = target?.result;
      this.setState({
        activeItem: result,
      });
    };
  };

  render() {
    const { jsonToggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={jsonToggle}>
        <ModalHeader toggle={jsonToggle}> My data </ModalHeader>
        <ModalBody>
          <h3>Import Json Data</h3>
          <Form>
            <FormGroup>
              <Input
                type="file"
                name="json_file"
                onChange={this.handleChange}
                required
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
