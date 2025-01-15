import { Icons, Text } from "@/components";
import { User } from "@/model";

const TieringSection = ({
  tiering,
}: {
  tiering: User.Search.Schema["tiering"] | null;
}) => {
  if (!tiering) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> Tiering Data
      </Text.H3>
      {Object.entries(tiering).map(([key, value]) =>
        key !== "total_score" && value ? (
          <div key={key} className="flex flex-col gap-2">
            <Text.BodySmall className="font-semibold text-main-blue">
              {key.replace(/_/g, " ").toUpperCase()}
            </Text.BodySmall>
            <Text.BodySmall className="text-tornado">
              Analysis: {value.analysis}, Score: {value.score}
            </Text.BodySmall>
          </div>
        ) : null,
      )}
      {tiering.total_score && (
        <div className="flex flex-col gap-2">
          <Text.BodySmall className="text-xl font-bold text-green-600">
            Total Score: {tiering.total_score}
          </Text.BodySmall>
        </div>
      )}
    </div>
  );
};

export { TieringSection };
