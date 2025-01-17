import { Icons, Text } from "@/components";
import { User } from "@/model";

const TieringSection = ({
  tiering,
}: {
  tiering: User.Search.Schema["tiering"] | null;
}) => {
  if (!tiering) return null; // Return null if no tiering data is provided
  console.log(tiering.fmv);
  const fmvValue = tiering.fmv ? parseFloat(tiering.fmv) : null;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header Section */}
      <Text.H3 className="flex flex-row items-center gap-3 text-gray-900">
        <Icons.FileSearch /> Tiering Data
      </Text.H3>

      {/* Tiering Details */}
      {tiering.tiering &&
        Object.entries(tiering.tiering).map(([header, value]) => {
          if (header === "total_score" || !value) return null; // Skip total_score and null values

          return (
            <div key={header} className="flex flex-col gap-2">
              <Text.BodySmall className="font-semibold text-main-blue">
                {header.replace(/_/g, " ").toUpperCase()} {/* Format headers */}
              </Text.BodySmall>
              <Text.BodySmall className="text-tornado">
                Analysis: {value.analysis}, Score: {value.score}
              </Text.BodySmall>
            </div>
          );
        })}

      {/* Total Score */}
      {tiering.tiering?.total_score && (
        <div className="flex flex-col gap-2">
          <Text.BodySmall className="text-xl font-bold text-green-600">
            Total Score: {tiering.tiering.total_score}
          </Text.BodySmall>
        </div>
      )}
      {/* FMV */}
      {/* Estimated Salary Range */}
      {fmvValue && (
        <div className="flex flex-col gap-4">
          <Text.BodySmall className="font-semibold text-main-blue">
            Estimated Salary Range
          </Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            Based on the profile and tiering, we estimate that the salary should be in the
            range of ${((fmvValue * 0.9).toFixed(2))} - ${(fmvValue * 1.1).toFixed(2)}.
          </Text.BodySmall>
        </div>
      )}

    </div>
  );
};

export { TieringSection };
