import { prisma } from "@/db";

export default async function Page() {
  async function createGroup(formData: FormData) {
    "use server";
    await prisma.group.create({
      data: {
        name: formData.get("groupName") as string,
      },
    });
  }

  return (
    <main className="container mx-auto">
      <h1 className="text text-2xl">New Group</h1>
      <form action={createGroup} className="space-y-4">
        <div>
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700"
          >
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-block w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Group
          </button>
        </div>
      </form>
    </main>
  );
}
