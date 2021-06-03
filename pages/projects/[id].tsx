import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Button, Flex, Text } from '@chakra-ui/react';
import Layout from '@/components/Layout/Layout';
import fetcher from '../../utils/fetcher';
import useUser from '@/hooks/useUser';
import EditProjectForm from '@/components/EditProjectForm/EditProjectForm';
import Project from '@/types/project';

const ProjectPage = () => {
  const router = useRouter();
  const [user] = useUser();
  const [editing, setEditing] = useState<boolean>(false);

  const { id } = router.query;
  const { data, mutate, error } = useSWR(id ? `/api/projects/${id}` : null, fetcher);

  if (error || (data && !data.success)) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;

  const { project } = data;

  const onEditingSuccess = async (projectUpdated: Project) => {
    await mutate(projectUpdated);
    setEditing(false);
  };

  return (
    <Layout title={project.name}>
      {editing ? (
        <EditProjectForm
          onSuccess={projectUpdated => onEditingSuccess(projectUpdated)}
          project={project}
        />
      ) : (
        <Flex align="center" justify="space-between">
          <Text>{project.name}</Text>

          {project.author._id === user._id && (
            <Button colorScheme="blue" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </Flex>
      )}
    </Layout>
  );
};

export default ProjectPage;
