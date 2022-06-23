import { AvField, AvForm } from "availity-reactstrap-validation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Table } from "reactstrap";

export default function App() {
    const [formValue, setFormValue] = useState([]);
    const initialState = {
        fullName: "",
        email: "",
        role: "",
    };
    const [state, setState] = useState(initialState);
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const FIELDS = [
        {
            type: "text",
            name: "name",
            label: "Enter your Full Name",
            value: state.fullName,
            required: true,
        },
        {
            type: "email",
            name: "email",
            label: "Enter your Email",
            value: state.email,
            required: true,
        },
        {
            type: "select",
            name: "role",
            label: "Select Role",
            value: state.role,
            required: true,
            options: [
                { label: "Author", value: "Author" },
                { label: "Editor", value: "Editor" },
                { label: "Subscriber", value: "Subscriber" },
                { label: "Administrator", value: "Administrator" },
            ],
        },
    ];

    /** Function to render the option with tags
     * @param  data
     */

    const renderOption = (element) => {
        return element.map((ele) => (
            <option value={ele.value}>{ele.label}</option>
        ));
    };

    /**
     * Api Call
     */

    useEffect(() => {
        getUser();
    }, []);

    /**
     *
     * @param {object} values stores user data
     */
    const createUser = (values) => {
        try {
            axios.post("/user-list", values).then(function (response) {
                console.log(response, "responses");
                if (response.data.status === 200) {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 1000);
                }
                if (response.data.status === 400) {
                    setError(true);
                    setTimeout(() => {
                        setError(false);
                    }, 1000);
                }
            });
        } catch (error) {
            setError(true);
        }
    };

    /**
     *
     *  Get user data
     */
    const getUser = () => {
        try {
            axios.get("/user-list").then(function (response) {
                if (response.status === 200) {
                    setData(response.data);
                }
            });
        } catch (error) {}
    };

    const onSubmit = (event, value) => {
        createUser(value);

        getUser();
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center">
                            Registration +
                        </div>
                        <div className="card-body">
                            <Row>
                                <Col md={3}></Col>
                                <Col md={6} className="mr-auto ml-auto">
                                    {success && (
                                        <Alert color="success" className="p-2">
                                            Successfully registered a new user!
                                        </Alert>
                                    )}
                                    {error && (
                                        <Alert color="danger" className="p-2">
                                            Error registering new user!
                                        </Alert>
                                    )}
                                    <AvForm onValidSubmit={onSubmit}>
                                        {FIELDS.map((fieldItem) => (
                                            <>
                                                {fieldItem.type == "text" && (
                                                    <AvField
                                                        type={fieldItem.type}
                                                        name={fieldItem.name}
                                                        label={fieldItem.label}
                                                        value={fieldItem.value}
                                                        required
                                                    />
                                                )}
                                                {fieldItem.type == "email" && (
                                                    <AvField
                                                        type={fieldItem.type}
                                                        name={fieldItem.name}
                                                        label={fieldItem.label}
                                                        value={fieldItem.value}
                                                        required
                                                    />
                                                )}
                                                {fieldItem.type == "select" && (
                                                    <AvField
                                                        type={fieldItem.type}
                                                        name={fieldItem.name}
                                                        label={fieldItem.label}
                                                        required
                                                    >
                                                        <option value="">
                                                            Select
                                                        </option>
                                                        {renderOption(
                                                            fieldItem.options
                                                        )}
                                                    </AvField>
                                                )}
                                            </>
                                        ))}
                                        <Row>
                                            <Col
                                                md={12}
                                                className={"text-center"}
                                            >
                                                <Button
                                                    type="submit"
                                                    color={"primary"}
                                                >
                                                    Register
                                                </Button>
                                            </Col>
                                        </Row>
                                    </AvForm>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className={"text-center"}>
                                    <h4 className="m-3">
                                        <u>List of users</u>
                                    </h4>
                                </Col>
                                <Col md={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Role</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((ele, ix) => (
                                                <tr>
                                                    <td>{ele.id}</td>
                                                    <td>{ele.name}</td>
                                                    <td>{ele.email}</td>
                                                    <td>{ele.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
