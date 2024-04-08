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
import { Grid, TableCell, tableCellClasses, TableRow } from "@mui/material";
import PatientForm from "../PatientForm/PatientForm";

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

export default function PatientCard({ data }) {
  const [formData, setFormData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleFormData = (data) => {
    setFormData(data);
    console.log("Form Data from Form Card : ", formData);
  };

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
                        Medical Conditions: {data.medicalConditions}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Insurance Provider: {data.insuranceProvider}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Primary Care Physician: {data.primaryCarePhysician}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Assigned Bed: {data.assigned_bed}
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
                        Emergency Contact Number: {data.emergencyContactNumber}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Allergies: {data.allergies}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Medications: {data.medications}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Insurance Number: {data.insuranceNumber}
                      </Typography>
                      <Typography variant="h6" className="datafield">
                        Last Visit Date: {data.lastVisitDate}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </div>
            <div>
              <Button onClick={handleOpenModal}>Update</Button>
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
                    <PatientForm action="Update" />
                    <Button></Button>
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
