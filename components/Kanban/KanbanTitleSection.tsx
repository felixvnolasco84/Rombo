type KanbanTitleSectionProps = {
  title: string;
  items: any[];
};

export default function KanbanTitleSection({
  items,
  title,
}: KanbanTitleSectionProps) {
  return (
    <div className="flex items-center justify-start gap-4 rounded-md bg-[#F2F2F2] p-4 shadow-md">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {items.length > 0 && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black bg-white text-xs leading-none">
            {items.length}
          </div>
        )}
      </div>
    </div>
  );
}
