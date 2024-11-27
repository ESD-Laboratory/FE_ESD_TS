import React, { useState, useMemo } from "react";
import EventTable from "./components/Table/EventTable";
import Card from "../../../components/elements/Card/Card";
import { Button } from "../../../components/elements/Button/Button";
import DialogRemove from "../../../components/ui/DialogRemove/DialogRemove";
import { closeModal, openModal } from "../../../utils/modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import DialogAddEvent from "./components/DialogAdd/DialogAddEvent";
import DialogEditEvent from "./components/DialogEdit/DialogEditEvent";
import { useDeleteEvent, useGetAllEvents } from "../../../services/event/event.query";

const EventsAdmin: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState<EventTypes>();
  const [deletedItem, setDeletedItem] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });

  const { id: deletedId, name: deletedName } = deletedItem;

  const { mutate: deleteEvent , isPending: pendingDelete } = useDeleteEvent({
    onSuccess: () => {
      setDeletedItem({ id: "", name: "" });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      closeModal("modal-delete");
      toast.success("Event deleted successfully");
      toast.success("Event deleted successfully");
      console.log("Event deleted successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete event");
    }
  })

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {data: eventData, isFetching, isError} = useGetAllEvents({
    page: currentPage,
    size: pageSize
  });

  // Assuming the API returns both data and metadata
  const tableData = eventData?.data || [];
  const totalPages = eventData?.pagination.totalPage || 1;

  console.log(eventData);

  if (isError) return <div>Error loading data.</div>;

  return (
    <>
      <Card className="space-y-6 p-6">
        <div className="inline-flex w-full justify-between">
          <h1 className="text-2xl font-semibold">Event </h1>
          <Button
            onClick={() => {
              openModal("add-event-dialog");
            }}
          >
            Add Event
          </Button>
        </div>
        <EventTable
          events={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          setSelectedEvent={setSelectedEvent}
          setDeletedItem={setDeletedItem}
          setCurrentPage={setCurrentPage}
          isLoading={isFetching} // Pass loading state to table
        />
      </Card>

      <DialogAddEvent
        onClose={() => {
          closeModal("add-event-dialog");
        }}
      />

      {selectedEvent ? (
        <DialogEditEvent
          selectedEvent={selectedEvent}
          onClose={() => {
            closeModal("edit-event-dialog");
            setSelectedEvent(undefined);
          }}
        />
      ) : null}

      <DialogRemove
        isPending={pendingDelete} // Pass pending state
        title={`Delete ${deletedName}`}
        onConfirm={() => {
          deleteEvent(deletedId);
        }}
        onClose={() => {
          closeModal("modal-delete");
        }}
      />
    </>
  );
};

export default EventsAdmin;
