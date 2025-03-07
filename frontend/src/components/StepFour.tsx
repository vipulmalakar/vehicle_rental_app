import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Box } from "@mui/material";
import * as Yup from "yup";
import { fetchVehicleModels } from "../services/api";
import { useBookingForm } from "../context/BookingFormContext";
import { BookingFormValues } from "../interfaces/BookingFormInterfaces";

interface VehicleModel {
  id: number;
  name: string;
}

const StepFourSchema = Yup.object().shape({
  vehicleId: Yup.number().required("Please select a vehicle model"),
});

const StepFour = ({ onSubmit, onBack }: { initialValues: BookingFormValues; onSubmit: (values: BookingFormValues) => void; onBack: () => void; }) => {
  const { formData } = useBookingForm();
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);

  useEffect(() => {
    if(!formData.typeId) return;
    fetchVehicleModels(formData.typeId)
      .then((res) => setVehicles(res.data.data))
      .catch((err) => console.error("Error fetching vehicles", err));
  }, [formData.typeId]);

  return (
    <Formik
      initialValues={{ ...formData, vehicleId: formData.vehicleId ?? 0 }}
      validationSchema={StepFourSchema}
      onSubmit={(values, { validateForm }) => {
        validateForm().then((errors) => {
          if (Object.keys(errors).length === 0) {
            onSubmit(values);
          }
        });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
            <RadioGroup
              row
              value={values.vehicleId}
              onChange={(e) => setFieldValue("vehicleId", Number(e.target.value))}
              sx={{ justifyContent: 'center', gap: 5 }}
            >
              {vehicles.map((vehicle: VehicleModel) => (
                <FormControlLabel key={vehicle.id} value={vehicle.id} control={<Radio />} label={vehicle.name} />
              ))}
            </RadioGroup>
          </FormControl>
          <ErrorMessage name="vehicleId" component="div" className="text-red-500" />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StepFour;