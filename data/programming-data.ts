// This file is a simple re-export to maintain backward compatibility
// Server components should import from programming-data-server.ts
// Client components should import from programming-data-client.ts

import { programmingData, validateProgrammingData } from "./programming-data-server"

export { programmingData, validateProgrammingData }
