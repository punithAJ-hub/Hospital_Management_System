import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import API from "../../utils/API";
import { flexbox } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Label } from "@mui/icons-material";
import { Box } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = ["patient", "doctor", "admin"];

export default function UserCard() {
  const [personName, setPersonName] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [nameAndEmail, setNameAndEmail] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await API.get("/users").then((res) => res.data);
      return response.users;
    };

    const fetchUsers = async () => {
      const users = await getAllUsers();
      // console.log("All users : ");
      const userNames = users.map((user: any) => user.name);
      const namesAndEmails = users.map((user) => ({
        [user.name]: user.email,
      }));

      setNameAndEmail(namesAndEmails);
      setNames(userNames);
      // console.log("Names and Emails  : ", namesAndEmails);
    };

    fetchUsers();
  }, [message]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const getEmail = (name) => {
    // console.log("name[0] ", name[0]);

    for (const obj of nameAndEmail) {
      const keys = Object.keys(obj);
      if (keys.length === 1 && keys[0] === name[0]) {
        return obj[name[0]];
      }
    }
    return "User not found";
  };

  const handleSubmit = async () => {
    const email = getEmail(personName);
    const data = {
      email: email,
      role: selectedRole,
    };

    // console.log("Updated with data ", data);
    // console.log("Person Name : ", personName);

    const response = await API.post("/users/updateRole", data);

    if (response.status === 200) {
      setMessage(response.data.message);
    }

    // console.log(response.data.message);
  };

  return (
    <>
      <Paper
        elevation={1}
        style={{
          width: 800,
          height: 500,
          margin: "auto",
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Typography variant="h3" style={{ paddingBottom: 20 }}>
            Manage Users
          </Typography>
          <FormControl sx={{ m: 1, width: 300, marginBottom: 3 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Select User
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 300, marginBottom: 3 }}>
            <InputLabel id="demo-simple-select-label">Assign Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ width: 300 }}
          >
            Submit
          </Button>
        </div>
        <Box pt={3}>
          <Typography color={"green"}>{message}</Typography>
        </Box>
      </Paper>
    </>
  );
}
