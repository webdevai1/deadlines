import GroupDetails from "./group-details";
import DeadlinesDetails from "./deadline-details";
import ConfirmActionDialog from "./confirm-action-dialog";

export default function Dialogs() {
  return (
    <>
      <ConfirmActionDialog />
      <DeadlinesDetails />
      <GroupDetails />
    </>
  );
}
