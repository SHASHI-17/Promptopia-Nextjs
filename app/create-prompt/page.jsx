'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const page = () => {

    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '', tag: ''
    })

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/new`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/');
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setSubmitting(false);
        }
    }
    return <Form
        type='create' post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}
    />
}

export default page