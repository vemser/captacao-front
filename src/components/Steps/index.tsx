import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { Person, DynamicForm, Check } from "@mui/icons-material";

export const Steps = { StepOne, StepTwo };

export const stepsInfos = [
  {
    label: "Informações",
    icon: <Person color="primary" />,
  },
  {
    label: "Formulário",
    icon: <DynamicForm color="primary" />,
  },
  {
    label: "Finalização",
    icon: <Check color="primary" />,
  },
];
