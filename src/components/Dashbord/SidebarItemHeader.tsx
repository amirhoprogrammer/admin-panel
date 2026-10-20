
export default function SidebarItemHeader({ title }: { title: string }) {
  return (
    <div className="mb-1 px-3 pt-1">
      <p className="text-muted-foreground/70 text-[12px] font-semibold tracking-[0.08em] uppercase">
        {title}
      </p>
    </div>
  );
}
