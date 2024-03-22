// Import the necessary modules from Next.js
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/router'; // Updated import for Next.js 14
import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const { id } = router.query; // Access query parameters using useRouter

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!id) return; // Check if id is available

      try {
        const response = await fetch(`/api/prompt/${id}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPromptDetails(); // No need for the if statement here since useEffect handles it
  }, [id]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) return alert('Missing PromptId!');

    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default UpdatePrompt;
