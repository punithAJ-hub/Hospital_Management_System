import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import API from "../../utils/API";

export default function BedSelection({ onSelectBed }) {
  // function to get vacant beds

  const [beds, setBeds] = useState(["B2002", "B2003"]); // to assign beds to the select menu
  const [bed, setBed] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);
  async function getVacantBeds() {
    const response = await API.get("/beds/vacant");
    if (response.status == 201) {
      const array = response.data.beds.map((bed) => bed.bed_id);
      setBeds(array);
    } else {
      console.log(response.data.error);
    }
  }

  useEffect(() => {
    const beds = getVacantBeds();
  }, [beds]);

  const handleChange = (event) => {
    const selectedBed = event.target.value;
    setBed(selectedBed);
    onSelectBed(selectedBed); // Pass selected bed to parent component
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* <Button sx={{ display: "block", mt: 0 }} onClick={handleOpen}>
        Assign Bed
      </Button> */}
      <FormControl sx={{ m: 0, minWidth: 520 }}>
        <InputLabel id="demo-controlled-open-select-label" onClick={handleOpen}>
          Assign bed
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={bed}
          label="bed"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {beds.map((bed) => (
            <MenuItem key={bed} value={bed}>
              {bed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
