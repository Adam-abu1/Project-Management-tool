/* eslint-env node */
import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY,
)

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occured in table '${tableName}' with code ${error.code}: ${error.message}`,
  );
  process.exit(1);
}

const logStep = ( stepMessage ) => {
  console.log( stepMessage );
};

const seedProjects = async numEtries => {
  logStep( 'Seeding projects...' );

  const projects = []

  for (let i = 0; i < numEtries; i++) {
    const name = faker.lorem.words(3);
    projects.push({
      name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects);

  if (error) {
    return logErrorAndExit('Projects', error );
  }

  logStep('Projects seeded successfully.');
  return data;
}

await seedProjects(10);
