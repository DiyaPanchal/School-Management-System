  export async function up(db) {
  
    await db.createCollection("students");
    await db.collection("students").insertMany([
      {
        name: "John Doe",
        age: 15,
        class: "10A",
        parentDetails: {
          name: "Jane Doe",
          contact: "1234567890",
        },
      },
      {
        name: "Alice Smith",
        age: 14,
        class: "9B",
        parentDetails: {
          name: "Bob Smith",
          contact: "0987654321",
        },
      },
    ]);

    await db.createCollection("teachers");
    await db.collection("teachers").insertMany([
      { name: "Mr. Brown", subject: "Mathematics" },
      { name: "Ms. Green", subject: "English" },
    ]);

    await db.createCollection("classes");
    await db.collection("classes").insertMany([
      { name: "10A", teacher: "Mr. Brown", students: ["John Doe"] },
      { name: "9B", teacher: "Ms. Green", students: ["Alice Smith"] },
    ]);
  };

  export async function down(db) {

    await db.collection("students").drop();
    await db.collection("teachers").drop();
    await db.collection("classes").drop();
  };
