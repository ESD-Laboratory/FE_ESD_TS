import React, { useState, useMemo, useEffect } from "react";
import {
  TAchievement,
  useDeleteAchievement,
  useGetAllAchievements,
} from "../../../services/achievement/achievement.query";
import Card from "../../../components/elements/Card/Card";
import { Button } from "../../../components/elements/Button/Button";
import DialogRemove from "../../../components/ui/DialogRemove/DialogRemove";
import { closeModal, openModal } from "../../../utils/modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import DialogAddAchievement from "./components/DialogAdd/DialogAddAchievement";
import DialogEditAchievement from "./components/DialogEdit/DialogEditAchievement";
import AchievementTable from "./components/Table/AchievementTable";
import { useSearchParams } from "react-router-dom";

const AchievementAdmin: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [selectedAchievement, setSelectedAchievement] =
    useState<TAchievement>();
  const [deletedItem, setDeletedItem] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });

  const params = {
    page: parseInt(searchParams.get("page") || "1", 10),
    size: parseInt(searchParams.get("size") || "10", 10),
  };

  console.log(parseInt(searchParams.get("page") || "1", 1));

  const { id: deletedId, name: deletedName } = deletedItem;

  const {
    data: achievementData,
    isFetching,
    // isError,
  } = useGetAllAchievements(params);

  const { mutate: deleteAchievement, isPending: pendingDelete } =
    useDeleteAchievement({
      onSuccess: () => {
        setDeletedItem({ id: "", name: "" });
        queryClient.invalidateQueries({ queryKey: ["achievements"] });
        closeModal("modal-delete");
        toast.success("Achievement deleted successfully");
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to delete achievement");
      },
    });

  // if (isError) return <div>Error loading data.</div>;

  useEffect(() => {
    if (achievementData?.pagination) {
      const { page, size, totalPage, totalData } = achievementData.pagination;
      setSearchParams({
        page: page.toString(),
        size: size.toString(),
        totalPage: totalPage.toString(),
        totalData: totalData.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievementData]);

  return (
    <>
      <Card className="space-y-6 p-6">
        <div className="inline-flex w-full justify-between">
          <h1 className="text-2xl font-semibold">Achievements</h1>
          <Button
            onClick={() => {
              openModal("add-achievement-dialog");
            }}
          >
            Add Achievement
          </Button>
        </div>
        <AchievementTable
          achievements={achievementData?.data || []}
          setSelectedAchievement={setSelectedAchievement}
          setDeletedItem={setDeletedItem}
          isLoading={isFetching} // Pass loading state to table
          pagination={
            achievementData?.pagination || {
              page: 1,
              size: 10,
              totalData: 0,
              totalPage: 1,
            }
          }
        />
      </Card>

      <DialogAddAchievement
        onClose={() => {
          closeModal("add-achievement-dialog");
        }}
      />

      {selectedAchievement ? (
        <DialogEditAchievement
          selectedAchievement={selectedAchievement}
          onClose={() => {
            closeModal("edit-achievement-dialog");
            setSelectedAchievement(undefined);
          }}
        />
      ) : null}

      <DialogRemove
        isPending={pendingDelete} // Pass pending state
        title={`Delete ${deletedName}`}
        onConfirm={() => {
          deleteAchievement(deletedId);
        }}
        onClose={() => {
          closeModal("modal-delete");
        }}
      />
    </>
  );
};

export default AchievementAdmin;
