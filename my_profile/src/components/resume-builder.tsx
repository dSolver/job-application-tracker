import React, { useState } from 'react'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const ResumeBuilder = () => {
    const [content, setContent] = useState('')

    return <ReactQuill theme="snow" value={content} onChange={setContent} />
}

export default ResumeBuilder