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

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await API.get("/users").then((res) => res.data);
      return response.users;
    };

    const fetchUsers = async () => {
      const users = await getAllUsers();
      const userNames = users.map((user: any) => user.name);
      const namesAndEmails = users.map((user) => ({
        [user.name]: user.email,
      }));
      setNameAndEmail(namesAndEmails);
      setNames(userNames);
    };

    fetchUsers();
  }, []);

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
    nameAndEmail
      .filter((user) => {
        user.name === name;
      })
      .map((user) => {
        user.email;
      });
  };

  const handleSubmit = async () => {
    const response = await API.post("/users/updateRole", {
      email: getEmail(personName),
      role: selectedRole,
    });

    console.log(response.data.message);
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
      </Paper>
    </>
  );
}
