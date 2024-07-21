import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../../components/PatientCard/PatientCard.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Grid, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import UpdateForm from "../PatientForm/UpdateForm";
import API from "../../utils/API";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const deleterecord = async (record) => {
  try {
    const res = await API.delete(
      `/patients/deleteRecord/${record.lastVisitDate}`
    );
  } catch (error) {
    console.log(error);
  }
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 800,
  padding: 10,
  overflowY: "auto",
};

export default function PatientCard({ data, isADoctor }) {
  const [formData, setFormData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="ml-5 pl-5 w-100">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
          }
          title={(data.firstName + " " + data.lastName).toUpperCase()} //Name
          subheader={data.gender} // Gender
        />

        <CardContent>
          <div style={{ display: "flex", gap: 110 }}>
            <div>
              <Button onClick={handleOpen}>View Details</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Button
                    style={{ marginLeft: 800, marginTop: 10 }}
                    onClick={() => setOpen(false)}
                  >
                    <CloseOutlinedIcon></CloseOutlinedIcon>
                  </Button>
                  <div>
                    <Typography variant="h3" color="primary" paddingBottom={3}>
                      Patient Records
                    </Typography>
                  </div>
                  <Paper elevation={3} style={{ padding: 20 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} className="grid">
                        <Typography variant="h6" className="datafield">
                          First Name: {data.firstName}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Date of Birth: {data.dob}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Gender: {data.gender}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Phone Number: {data.phoneNumber}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Address: {data.address}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Emergency Contact Name: {data.emergencyContactName}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Allergies: {data.allergies}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6" className="datafield">
                          Last Name: {data.lastName}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Blood Type: {data.bloodType}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Email: {data.email}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Emergency Contact Number:{" "}
                          {data.emergencyContactNumber}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Insurance Provider: {data.insuranceProvider}
                        </Typography>
                        <Typography variant="h6" className="datafield">
                          Insurance Number: {data.insuranceNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Grid container spacing={2}>
                    {data.records.map((record, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper
                          elevation={2}
                          style={{ padding: 20, marginTop: 10 }}
                        >
                          <Box
                            component={"div"}
                            justifyContent={"end"}
                            display={"flex"}
                            onClick={() => {
                              deleterecord(record);
                            }}
                          >
                            <ClearIcon color="primary"></ClearIcon>
                          </Box>
                          <Typography variant="h6" className="datafield">
                            Medications: {record.medications}
                          </Typography>
                          <Typography variant="h6" className="datafield">
                            Medical Conditions: {record.medicalConditions}
                          </Typography>
                          <Typography variant="h6" className="datafield">
                            Primary Care Physician:{" "}
                            {record.primaryCarePhysician}
                          </Typography>
                          <Typography variant="h6" className="datafield">
                            Assigned Bed: {record.assigned_bed}
                          </Typography>
                          <Typography variant="h6" className="datafield">
                            Last Visited Date: {record.lastVisitDate}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Modal>
            </div>
            <div>
              {isADoctor && <Button onClick={handleOpenModal}>Update</Button>}
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Button
                    style={{ marginLeft: 800, marginTop: 0 }}
                    onClick={() => setOpenModal(false)}
                  >
                    <CloseOutlinedIcon></CloseOutlinedIcon>
                  </Button>
                  <div>
                    <UpdateForm emailId={data.email}></UpdateForm>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
