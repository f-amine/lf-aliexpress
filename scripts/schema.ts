import { printSchema } from 'graphql';
import fs from 'fs';
import path from 'path';
import schema from '@/graphql/schema';

// Print schema to SDL format
const sdlSchema = printSchema(schema);

const outputDir = path.join(__dirname, '../graphql/');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write schema to file
const outputPath = path.join(outputDir, 'schema.graphql');
fs.writeFileSync(outputPath, sdlSchema);

console.log(`Schema written to ${outputPath}`);
