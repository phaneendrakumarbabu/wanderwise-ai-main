export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-background py-12">
      <div className="container-editorial px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl">WanderWise</span>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
              AI Travel Discovery
            </p>
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="font-mono text-xs text-muted-foreground">
              © 2026 — All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
