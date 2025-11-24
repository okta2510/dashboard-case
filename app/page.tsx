"use client"

import { useState } from "react"
import Image from "next/image";
import { Card } from "@/components/ui/card"
import { Link2, FileText, Database } from "lucide-react"
import { CreatePlaybookModal } from "@/components/create-playbook-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="bg-background">
      <main className="container mx-auto">
         <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-10 block">
          <h1 className="mb-1.5 text-4xl font-bold text-foreground">Library</h1>
          <p className="text-muted-foreground">Manage your playbooks, templates, and knowledge base.</p>
        </div>
        {/* Pinned Playbooks */}
        <section className="mb-12">
          <h2 className="mb-2 text-lg font-semibold">Pinned Playbooks</h2>
          <p className="mb-4 text-sm text-muted-foreground">Quick access to your most frequently usednplaybooks.</p>
          <Card className="flex flex-col items-center justify-center py-16">
            <div className=" flex w-auto items-center justify-center rounded-full">
              <Link2 className="h-auto w-[23px] text-muted-foreground" />
            </div>
            <div className="text-center flex-row">
              <h3 className="mb-2 text-base font-semibold">No pinned playbooks</h3>
              <p className="text-balance text-center text-sm text-muted-foreground">
                Pin your favorite playbooks for quick access. Create your first playbook to get started.
              </p>
            </div>
          </Card>
        </section>

        {/* Get Started */}
        <section className="mb-12">
          <h2 className="mb-2 text-lg font-semibold">Get Started</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Create custom playbooks for different analysis types or run your existing workflows.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer p-6 transition-colors hover:bg-accent" onClick={() => setIsModalOpen(true)}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Link2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold">Create a Playbook</h3>
              <p className="text-sm text-muted-foreground">
                Build tailored playbooks for clients using your templates and workflows.
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold">Create a Template</h3>
              <p className="text-sm text-muted-foreground">
                Upload and manage templates to standardize reports and reviews.
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold">Add to Knowledge Base</h3>
              <p className="text-sm text-muted-foreground">
                Add resources and insights to expand your organizations knowledge.
              </p>
            </Card>
          </div>
        </section>

        {/* View */}
        <section>
          <h2 className="mb-2 text-lg font-semibold">View</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Browse and manage your playbooks, templates, and knowledge base.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Link2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold">Playbooks</h3>
              <p className="text-sm text-muted-foreground">View and manage all your custom playbooks and workflows.</p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold">Templates</h3>
              <p className="text-sm text-muted-foreground">
                Upload and manage report templates for automated formatting.
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground">Access your knowledge base and legal resources.</p>
            </Card>
          </div>
        </section>
      </div>
      </main>
      <CreatePlaybookModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
