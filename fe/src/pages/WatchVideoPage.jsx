import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WatchVideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get(`http://localhost:8000/api/videos/${id}`)
      .then(res => {
        console.log('API DATA:', res.data);
        setVideo(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Không lấy được dữ liệu video!');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Đang tải video...</div>;
  if (error) return <div style={{ color: 'red', padding: 40 }}>{error}</div>;
  if (!video) return <div style={{ padding: 40, color: 'orange' }}>Không tìm thấy video.</div>;

  // Đến đây chắc chắn đã có video
  let isYoutube = false;
  let youtubeId = '';
  let fixedUrl = '';
  if (typeof video.video_url === 'string') {
    fixedUrl = video.video_url.replace(/\\\//g, '/').trim();
    isYoutube = fixedUrl.toLowerCase().includes('youtube.com') || fixedUrl.toLowerCase().includes('youtu.be');
    if (isYoutube) {
      const urlParams = new URLSearchParams(fixedUrl.split('?')[1]);
      youtubeId = urlParams.get('v');
      if (!youtubeId) {
        const match = fixedUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        youtubeId = match ? match[1] : '';
      }
    }
    console.log('fixedUrl:', fixedUrl, 'isYoutube:', isYoutube, 'youtubeId:', youtubeId);
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <div style={{ margin: '24px 0' }}>
        {isYoutube && youtubeId ? (
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video width="100%" height="450" controls>
            <source src={fixedUrl} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        )}
      </div>
    </div>
  );
}

export default WatchVideoPage;