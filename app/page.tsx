import Image from "next/image";


export default function Home() {
  return (
    <div className="bg-background">
      <main className="container mx-auto">
        <div className="">
          <h1 className="mb-[6px] text-4xl font-bold text-foreground">Library</h1>
          <p className="text-muted-foreground">Manage your playbooks, templates, and knowledge base.</p>
        </div>
      </main>
    </div>
  );
}
