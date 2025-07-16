import { Button } from "@repo/shared/ui";
import { SquarePen } from "lucide-react";

interface EditButtonProps {
  onSave: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditButton({ onSave, isEditing, setIsEditing }: EditButtonProps) {
  function onCancel() {
    setIsEditing(false);
    console.log("cancel");
  }

  function onEdit() {
    setIsEditing(true);
    console.log("edit");
  }
  return (
    <>
      {isEditing ? (
        <div className={"flex flex-row gap-1"}>
          <Button variant={"default"} size={"sm"} className={"gap-2"} onClick={onSave}>
            Save
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant={"outline"} className={"gap-2"} size={"sm"} onClick={onEdit}>
          <SquarePen size="14px" />
          Edit
        </Button>
      )}
    </>
  );
}
