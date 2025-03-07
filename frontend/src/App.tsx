import BookingForm from "./pages/BookingForm";
import { BookingFormProvider } from "./context/BookingFormContext";

function App() {
  return (
    <BookingFormProvider>
      <BookingForm />
    </BookingFormProvider>
  );
}

export default App;