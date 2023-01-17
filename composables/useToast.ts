import useToast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default function () {
  const toast = useToast();
  return toast;
}