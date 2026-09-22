import KineticGrid from "@/components/ui/kinetic-grid";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
  revealFooter = true,
}: {
  children: React.ReactNode;
  revealFooter?: boolean;
}) {
  return (
    <KineticGrid globalColor="default">
      <SiteHeader />
      <div className="relative z-10 min-h-[100svh] pt-14 md:pt-16">
        {children}
        {revealFooter ? (
          <>
            {/* Spacer content bottom so footer curtain can reveal */}
            <div className="h-8" />
            <CinematicFooter />
          </>
        ) : null}
      </div>
    </KineticGrid>
  );
}
