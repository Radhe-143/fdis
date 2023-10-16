import repo from './repository';

async function create(body) {
  const { subject,Text,html } = body; // Extract subject from the body
  return repo.create(body, subject,Text,html); // Pass both body and subject to the repository
}

export default {
  create,
}
