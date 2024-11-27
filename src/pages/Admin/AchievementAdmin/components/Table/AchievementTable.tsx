import React from "react";
import { Button } from "../../../../../components/elements/Button/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { openModal } from "../../../../../utils/modal";
import { TAchievement } from "../../../../../services/achievement/achievement.query";
import { useSearchParams } from "react-router-dom";

interface AchievementTableProps {
  achievements: TAchievement[];
  setSelectedAchievement: (achievement: TAchievement) => void;
  setDeletedItem: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
  pagination: Pagination;
  isLoading: boolean;
}

const AchievementTable: React.FC<AchievementTableProps> = ({
  achievements,
  setSelectedAchievement,
  setDeletedItem,
  isLoading,
  pagination: { page, size, totalData, totalPage },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPageIndex: number) => {
    console.log(page + ": " + newPageIndex);
    console.log(page + newPageIndex);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: (page + newPageIndex).toString(),
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Achievement</th>
              <th>Organizer</th>
              <th>Tanggal</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : null}
            {!isLoading && achievements.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No data found
                </td>
              </tr>
            ) : null}

            {achievements?.map((achievement: TAchievement) => (
              <tr key={achievement.id}>
                <td>{achievement.id}</td>
                <td>{achievement.name}</td>
                <td>{achievement.organizer}</td>
                <td>{achievement.date}</td>
                <td>
                  {achievement.image ? (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={achievement.image} alt={achievement.name} />
                      </div>
                    </div>
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        setSelectedAchievement(achievement);
                        openModal("edit-achievement-dialog");
                      }}
                    >
                      <PencilSquareIcon className="size-5" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setDeletedItem?.({
                          id: achievement.id!,
                          name: achievement.name,
                        });
                        openModal("modal-delete");
                      }}
                    >
                      <TrashIcon className="size-5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => handlePageChange(-1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPage}
        </span>
        <button
          className="btn btn-sm"
          disabled={page === totalPage}
          onClick={() => handlePageChange(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AchievementTable;
