import { useState } from "react";
import { Button, Input, Modal } from "@/components/elements";

interface Props {
  onClick: (pageName: string) => void;
  variant?: "between" | "end";
}

export const AddPage: React.FC<Props> = ({ onClick, variant = "end" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageName, setPageName] = useState("");

  const handleAddClick = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setPageName("");
  };
  const handleSubmit = () => {
    if (pageName.trim()) {
      onClick(pageName);
      handleClose();
    }
  };

  const buttonContent = variant === "between" ? (
    <span className="flex justify-center items-center w-full h-full text-gray-900 text-xs leading-none">
      +
    </span>
  ) : (
    <span className="text-gray-900">+ Add page</span>
  );

  const buttonClass = variant === "between" ? 
    "w-4 h-4" : 
    "w-[106.5px] h-8 py-1 px-2.5 gap-1.5";

  return (
    <>
      <button
        onClick={handleAddClick}
        className={`
          box-border flex flex-row justify-center items-center
          bg-white border border-gray-200 rounded-lg
          shadow-xs flex-none flex-grow-0 cursor-pointer
          transition-all duration-200 ease-in-out
          hover:bg-gray-50 focus:outline-none
          ${buttonClass}
        `}
        aria-label={variant === "between" ? "Add step between" : "Add new page"}
      >
        {buttonContent}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Add New Page</h3>
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder="Enter page name"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!pageName.trim()}
            >
              Add Page
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};