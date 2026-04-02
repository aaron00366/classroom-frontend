import { Subject } from "@/types";

export const mockSubjects: Subject[] = [
    {
        id: "1",
        code: "CS301",
        name: "Data Structures and Algorithms",
        department: "Computer Science",
        description: "An in-depth study of fundamental data structures such as trees, graphs, and hash tables, along with algorithm design and complexity analysis.",
        createdAt: new Date().toISOString(),

    },
    {
        id: "2",
        code: "MATH201",
        name: "Linear Algebra",
        department: "Mathematics",
        description: "Covers vector spaces, linear transformations, matrices, eigenvalues, and their applications in engineering and computer science.",
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        code: "BUS410",
        name: "Strategic Management",
        department: "Business Administration",
        description: "Examines frameworks for competitive analysis, corporate strategy, and decision-making in complex organisational environments.",
        createdAt: new Date().toISOString(),
    },
];