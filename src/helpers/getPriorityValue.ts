// Function to assign numeric values to string priorities
export default function getPriorityValue(priority: any) {
  switch (priority) {
    case "HIGH":
      return 3;
    case "MEDIUM":
      return 2;
    case "LOW":
      return 1;
    default:
      return 0; // Default priority or unknown value
  }
}
