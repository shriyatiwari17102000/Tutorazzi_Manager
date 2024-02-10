import { toast } from "react-toastify";

function ToasterUpdate(toastID, data, type) {
    console.log(toastID)
    console.log(type)
    console.log(data)
  toast.update(toastID, {
    render: data,
    type,
    autoClose: 1500,
    isLoading: false,
  });
}

export default ToasterUpdate;