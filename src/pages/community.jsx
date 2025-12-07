// src/pages/community.jsx
import ChatFab from "../components/ChatFab.jsx";
import React, { useState, useEffect } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Overcoming Performance Anxiety Before Big Games",
      content: "I've struggled with intense anxiety before competitions for years. The pressure to perform, the fear of letting down my team... It was paralyzing. But I've discovered some techniques that have genuinely helped me manage these feelings. Meditation, deep breathing, and positive self-talk have been game-changers for me.",
      category: "performance",
      isFeatured: true,
      anonymousAuthor: "StudentAthlete24",
      reactions: { 
        like: 42, 
        love: 28, 
        support: 15, 
        insightful: 12, 
        relate: 8, 
        pray: 5 
      },
      userReaction: null,
      commentCount: 12,
      timestamp: "2 days ago",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "My Journey Back from a Serious Injury",
      content: "Six months ago, I tore my ACL during a championship game. The physical pain was nothing compared to the mental struggle. I felt like my identity was tied to my sport, and without it, I was lost. This community helped me realize there's more to me than athletics. The support I received here gave me strength during my darkest days.",
      category: "recovery",
      anonymousAuthor: "RecoveryTrail57",
      reactions: { 
        like: 35, 
        love: 42, 
        support: 18, 
        insightful: 9, 
        relate: 15, 
        pray: 7 
      },
      userReaction: null,
      commentCount: 7,
      timestamp: "1 day ago",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Life After College Sports - Who Am I Now?",
      content: "My final season ended three months ago, and I'm struggling to find my place. For so long, my schedule revolved around practices, games, and training. Now there's this void. How have others navigated this transition? I'd love to hear your experiences and advice on finding purpose beyond sports.",
      category: "transition",
      anonymousAuthor: "GraduatedAthlete33",
      reactions: { 
        like: 28, 
        love: 19, 
        support: 22, 
        insightful: 14, 
        relate: 31, 
        pray: 3 
      },
      userReaction: null,
      commentCount: 14,
      timestamp: "3 days ago",
      readTime: "3 min read"
    }
  ]);

  const [comments, setComments] = useState({
    1: [
      { id: 1, author: "SupportivePlayer42", content: "Thank you for sharing this. I'm going through a similar situation and your words gave me hope.", timestamp: "5 hours ago" },
      { id: 2, author: "MindfulAthlete19", content: "The identity piece really resonates with me. It's a struggle so many of us face but rarely talk about.", timestamp: "3 hours ago" },
    ],
    2: [
      { id: 1, author: "FormerPlayer88", content: "It gets better, I promise. The first year is the hardest. Try to find new activities that give you that sense of purpose and community.", timestamp: "2 days ago" },
      { id: 2, author: "CoachMindset", content: "Consider mentoring younger athletes. Your experience is valuable, and sharing it can help fill that void.", timestamp: "1 day ago" }
    ],
    3: [
      { id: 1, author: "LifeAfterSport", content: "Take this time to explore other interests you never had time for. It's okay to not have everything figured out right away.", timestamp: "2 days ago" },
      { id: 2, author: "CareerCoach22", content: "Your discipline and teamwork skills are highly transferable to many careers. Consider career counseling at your university.", timestamp: "1 day ago" }
    ]
  });

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    isAnonymous: true
  });

  const [newComments, setNewComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { key: 'all', name: 'All Posts', icon: '📝' },
    { key: 'general', name: 'General', icon: '💬' },
    { key: 'performance', name: 'Performance', icon: '⚡' },
    { key: 'recovery', name: 'Recovery', icon: '🔄' },
    { key: 'transition', name: 'Transition', icon: '🎓' },
    { key: 'relationships', name: 'Relationships', icon: '👥' }
  ];

  const reactions = [
    { type: 'like', emoji: '👍', label: 'Like', color: '#3b82f6', bgColor: '#dbeafe' },
    { type: 'love', emoji: '❤️', label: 'Love', color: '#ef4444', bgColor: '#fee2e2' },
    { type: 'support', emoji: '🤝', label: 'Support', color: '#10b981', bgColor: '#d1fae5' },
    { type: 'insightful', emoji: '💡', label: 'Insightful', color: '#f59e0b', bgColor: '#fef3c7' },
    { type: 'relate', emoji: '👥', label: 'I Relate', color: '#8b5cf6', bgColor: '#ede9fe' },
    { type: 'pray', emoji: '🙏', label: 'Prayers', color: '#6366f1', bgColor: '#e0e7ff' }
  ];

  const generateAnonymousName = () => {
    const adjectives = ['Brave', 'Strong', 'Resilient', 'Courageous', 'Mindful', 'Peaceful'];
    const nouns = ['Athlete', 'Player', 'Competitor', 'Champion', 'Warrior', 'Survivor'];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}${randomNum}`;
  };

  const handleReaction = (postId, reactionType) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReactions = { ...post.reactions };
        const currentUserReaction = post.userReaction;
        
        if (currentUserReaction && currentUserReaction !== reactionType) {
          newReactions[currentUserReaction] = Math.max(0, newReactions[currentUserReaction] - 1);
        }
        
        if (currentUserReaction === reactionType) {
          newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1);
          return { ...post, reactions: newReactions, userReaction: null };
        } else {
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...post, reactions: newReactions, userReaction: reactionType };
        }
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    if (newComments[postId]?.trim()) {
      const newComment = {
        id: comments[postId]?.length + 1 || 1,
        author: generateAnonymousName(),
        content: newComments[postId],
        timestamp: 'Just now'
      };

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));

      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, commentCount: post.commentCount + 1 }
          : post
      ));

      setNewComments(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const anonymousAuthor = generateAnonymousName();
      const newPostData = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        isFeatured: false,
        anonymousAuthor,
        reactions: {
          like: 0,
          love: 0,
          support: 0,
          insightful: 0,
          relate: 0,
          pray: 0
        },
        userReaction: null,
        commentCount: 0,
        timestamp: 'Just now',
        readTime: `${Math.ceil(newPost.content.length / 200)} min read`
      };

      setPosts([newPostData, ...posts]);
      setNewPost({ title: '', content: '', category: 'general', isAnonymous: true });
      setShowShareModal(false);
      setIsSubmitting(false);

      alert('Your story has been shared anonymously! Thank you for contributing to our community.');
    }, 1000);
  };

  const filteredPosts = posts.filter(post => 
    activeCategory === 'all' || post.category === activeCategory
  );

  const totalReactions = (post) => {
    return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
  };

  const topReactions = (post) => {
    return Object.entries(post.reactions)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => reactions.find(r => r.type === type));
  };

  // Inline styles object
  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      color: 'white',
      padding: '4rem 0',
      marginBottom: '3rem',
      position: 'relative',
      overflow: 'hidden'
    },
    headerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2rem'
    },
    headerContent: {
      flex: '1'
    },
    headerTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      opacity: '0.9',
      marginBottom: '2rem',
      maxWidth: '600px'
    },
    communityStats: {
      display: 'flex',
      gap: '2rem',
      marginTop: '2rem'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.1rem',
      opacity: '0.9'
    },
    shareStoryBtn: {
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#1e293b',
      border: 'none',
      borderRadius: '50px',
      padding: '1rem 2rem',
      fontWeight: '700',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
    },
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    contentWrapper: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '3rem'
    },
    postsColumn: {
      flex: '1'
    },
    sidebarColumn: {
      width: '350px'
    },
    categoryFilter: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '16px',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    filterButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    filterBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      background: 'transparent',
      color: '#475569',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    postCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    featuredBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#1e293b',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    categoryTag: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600'
    },
    postTitle: {
      color: '#1e3a8a',
      fontWeight: '700',
      marginBottom: '1rem',
      fontSize: '1.5rem'
    },
    postContent: {
      color: '#475569',
      lineHeight: '1.7',
      marginBottom: '1.5rem',
      fontSize: '1.05rem'
    },
    postMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0',
      marginBottom: '1.5rem'
    },
    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    authorAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    },
    postStats: {
      display: 'flex',
      gap: '1.5rem'
    },
    stat: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#475569',
      fontWeight: '500'
    },
    reactionsSection: {
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0'
    },
    reactionPreviews: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    reactionPreview: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      border: '3px solid white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      transition: 'transform 0.2s ease'
    },
    reactionButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.75rem',
      marginTop: '1rem'
    },
    reactionBtn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.75rem 0.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      background: 'transparent',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.85rem'
    },
    commentToggleBtn: {
      gridColumn: 'span 2',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.75rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    commentsSection: {
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0'
    },
    comment: {
      background: '#f8fafc',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem'
    },
    commentAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem'
    },
    commentAvatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    commentInputGroup: {
      display: 'flex',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden'
    },
    commentInput: {
      flex: '1',
      border: 'none',
      padding: '1rem',
      fontSize: '0.95rem',
      background: 'white'
    },
    sendCommentBtn: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '1rem 1.5rem',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    },
    sidebar: {
      position: 'sticky',
      top: '2rem'
    },
    sidebarCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    },
    statsCard: {
      background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      color: 'white'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem'
    },
    statBox: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '1.75rem',
      fontWeight: '800',
      color: '#fde047',
      marginBottom: '0.25rem'
    },
    resourceList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    resourceBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      background: 'transparent',
      color: '#475569',
      fontWeight: '500',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    wellnessTip: {
      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      border: '2px solid #f59e0b'
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1000',
      padding: '1rem'
    },
    shareModal: {
      background: 'white',
      borderRadius: '20px',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem',
      background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      color: 'white',
      borderRadius: '20px 20px 0 0'
    },
    modalBody: {
      padding: '2rem'
    },
    privacyNotice: {
      background: '#f0f9ff',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '2rem',
      borderLeft: '4px solid #3b82f6'
    },
    categoryOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '0.75rem'
    },
    categoryLabel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    formInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.2s ease'
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      paddingTop: '2rem',
      borderTop: '1px solid #e2e8f0'
    },
    primaryBtn: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    floatingActionBtn: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#1e293b',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
      zIndex: '100',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.headerContent}>
            <h1 style={styles.headerTitle}>Community Support</h1>
            <p style={styles.headerSubtitle}>A safe space to share, connect, and heal together. Your privacy is always protected.</p>
            <div style={styles.communityStats}>
              <span style={styles.statItem}>
                <span>📝</span> {posts.length} Stories Shared
              </span>
              <span style={styles.statItem}>
                <span>❤️</span> {posts.reduce((sum, post) => sum + totalReactions(post), 0)} Support Actions
              </span>
              <span style={styles.statItem}>
                <span>💬</span> {Object.values(comments).flat().length} Comments
              </span>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            <button 
              style={styles.shareStoryBtn}
              onClick={() => setShowShareModal(true)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>✍️</span>
              <span>Share Your Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContainer}>
        <div style={styles.contentWrapper}>
          {/* Left Column - Posts */}
          <div style={styles.postsColumn}>
            {/* Category Filter */}
            <div style={styles.categoryFilter}>
              <div style={styles.filterButtons}>
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    style={{
                      ...styles.filterBtn,
                      background: activeCategory === cat.key ? '#3b82f6' : 'transparent',
                      borderColor: activeCategory === cat.key ? '#3b82f6' : '#e2e8f0',
                      color: activeCategory === cat.key ? 'white' : '#475569'
                    }}
                    onClick={() => setActiveCategory(cat.key)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = activeCategory !== cat.key ? 'translateY(-2px)' : ''}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Posts List */}
            <div>
              {filteredPosts.length === 0 ? (
                <div style={{...styles.postCard, textAlign: 'center', padding: '4rem 2rem'}}>
                  <div style={{fontSize: '3rem', opacity: 0.5, marginBottom: '1rem'}}>💬</div>
                  <h3 style={{color: '#1e3a8a', marginBottom: '0.5rem'}}>No posts yet in this category</h3>
                  <p style={{color: '#475569', marginBottom: '2rem'}}>Be the first to share your story!</p>
                  <button 
                    style={styles.primaryBtn}
                    onClick={() => setShowShareModal(true)}
                  >
                    <span>✍️</span>
                    Share Your First Story
                  </button>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <div key={post.id} style={{
                    ...styles.postCard,
                    borderLeft: post.isFeatured ? '5px solid #f59e0b' : 'none',
                    transform: 'translateY(0)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {post.isFeatured && (
                      <div style={styles.featuredBadge}>
                        <span>⭐</span>
                        Featured Story
                      </div>
                    )}
                    
                    <div style={{marginBottom: '1rem'}}>
                      <span style={{
                        ...styles.categoryTag,
                        background: post.category === 'performance' ? '#dbeafe' : 
                                   post.category === 'recovery' ? '#dcfce7' : 
                                   post.category === 'transition' ? '#fef3c7' : 
                                   post.category === 'relationships' ? '#f3e8ff' : '#f1f5f9',
                        color: post.category === 'performance' ? '#1e40af' : 
                               post.category === 'recovery' ? '#166534' : 
                               post.category === 'transition' ? '#92400e' : 
                               post.category === 'relationships' ? '#6b21a8' : '#475569'
                      }}>
                        {categories.find(c => c.key === post.category)?.icon} {post.category}
                      </span>
                    </div>

                    <h2 style={styles.postTitle}>{post.title}</h2>
                    
                    <p style={styles.postContent}>{post.content}</p>
                    
                    <div style={styles.postMeta}>
                      <div style={styles.authorInfo}>
                        <div style={styles.authorAvatar}>
                          {post.anonymousAuthor.substring(0, 2)}
                        </div>
                        <div>
                          <div style={{fontWeight: '600', color: '#1e293b'}}>{post.anonymousAuthor}</div>
                          <div style={{color: '#64748b', fontSize: '0.9rem'}}>
                            <span>🕒</span>
                            {post.timestamp} • {post.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.postStats}>
                        <span style={styles.stat}>
                          <span>❤️</span> {post.reactions.love}
                        </span>
                        <span style={styles.stat}>
                          <span>💬</span> {post.commentCount}
                        </span>
                      </div>
                    </div>

                    {/* Reactions Section */}
                    <div style={styles.reactionsSection}>
                      <div style={{marginBottom: '1rem'}}>
                        {topReactions(post).length > 0 && (
                          <div style={styles.reactionPreviews}>
                            {topReactions(post).map((reaction, index) => (
                              <span 
                                key={reaction.type}
                                style={{ 
                                  ...styles.reactionPreview,
                                  backgroundColor: reaction.bgColor,
                                  color: reaction.color,
                                  marginLeft: index > 0 ? '-8px' : '0',
                                  zIndex: 3 - index
                                }}
                                title={`${reaction.label}: ${post.reactions[reaction.type]}`}
                              >
                                {reaction.emoji}
                              </span>
                            ))}
                            <span style={{color: '#64748b', fontSize: '0.9rem', marginLeft: '0.5rem'}}>
                              {totalReactions(post)} reactions
                            </span>
                          </div>
                        )}
                      </div>

                      <div style={styles.reactionButtons}>
                        {reactions.map(reaction => (
                          <button
                            key={reaction.type}
                            style={{
                              ...styles.reactionBtn,
                              backgroundColor: post.userReaction === reaction.type ? reaction.bgColor : 'transparent',
                              borderColor: post.userReaction === reaction.type ? reaction.color : '#e5e7eb',
                              color: post.userReaction === reaction.type ? reaction.color : '#6b7280',
                              transform: 'translateY(0)'
                            }}
                            onClick={() => handleReaction(post.id, reaction.type)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            title={reaction.label}
                          >
                            <span style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>{reaction.emoji}</span>
                            <span style={{fontWeight: '600', marginBottom: '0.25rem', whiteSpace: 'nowrap'}}>{reaction.label}</span>
                            <span style={{fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.4rem', borderRadius: '10px', backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
                              {post.reactions[reaction.type] || 0}
                            </span>
                          </button>
                        ))}
                        
                        <button 
                          style={styles.commentToggleBtn}
                          onClick={() => setShowComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <span>💬</span>
                          Comment
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {showComments[post.id] && (
                      <div style={styles.commentsSection}>
                        <div style={{marginBottom: '1.5rem'}}>
                          {(comments[post.id] || []).map(comment => (
                            <div key={comment.id} style={styles.comment}>
                              <div style={styles.commentAuthor}>
                                <div style={styles.commentAvatar}>
                                  {comment.author.substring(0, 2)}
                                </div>
                                <div>
                                  <div style={{fontWeight: '600', color: '#1e293b', fontSize: '0.95rem'}}>{comment.author}</div>
                                  <div style={{color: '#64748b', fontSize: '0.8rem'}}>{comment.timestamp}</div>
                                </div>
                              </div>
                              <div style={{color: '#475569', lineHeight: '1.6', fontSize: '0.95rem'}}>{comment.content}</div>
                            </div>
                          ))}
                        </div>

                        <div>
                          <div style={styles.commentInputGroup}>
                            <input
                              type="text"
                              style={styles.commentInput}
                              placeholder="Write a supportive comment..."
                              value={newComments[post.id] || ''}
                              onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            />
                            <button 
                              style={{
                                ...styles.sendCommentBtn,
                                opacity: !newComments[post.id]?.trim() ? '0.5' : '1',
                                cursor: !newComments[post.id]?.trim() ? 'not-allowed' : 'pointer'
                              }}
                              onClick={() => handleAddComment(post.id)}
                              disabled={!newComments[post.id]?.trim()}
                            >
                              📤
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div style={styles.sidebarColumn}>
            <div style={styles.sidebar}>
              {/* Quick Stats */}
              <div style={styles.statsCard}>
                <h3 style={{color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>📊</span>
                  Community Impact
                </h3>
                <div style={styles.statsGrid}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>{posts.length}</div>
                    <div style={{fontSize: '0.85rem', opacity: '0.9'}}>Stories Shared</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>
                      {posts.reduce((sum, post) => sum + totalReactions(post), 0)}
                    </div>
                    <div style={{fontSize: '0.85rem', opacity: '0.9'}}>Reactions</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber}>
                      {Object.values(comments).flat().length}
                    </div>
                    <div style={{fontSize: '0.85rem', opacity: '0.9'}}>Comments</div>
                  </div>
                </div>
              </div>

              {/* Quick Resources */}
              <div style={styles.sidebarCard}>
                <h3 style={{color: '#1e3a8a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>🚀</span>
                  Quick Resources
                </h3>
                <div style={styles.resourceList}>
                  <button style={styles.resourceBtn}>
                    <span>🏃‍♂️</span>
                    <span>Performance Anxiety Guide</span>
                  </button>
                  <button style={styles.resourceBtn}>
                    <span>💤</span>
                    <span>Sleep & Recovery Tips</span>
                  </button>
                  <button style={styles.resourceBtn}>
                    <span>🎓</span>
                    <span>Career Transition</span>
                  </button>
                  <button style={{...styles.resourceBtn, background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none', marginTop: '0.5rem'}}>
                    <span>🆘</span>
                    <span>Crisis Support</span>
                  </button>
                </div>
              </div>

              {/* Wellness Tip */}
              <div style={{...styles.sidebarCard, ...styles.wellnessTip}}>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                  <div style={{fontSize: '1.5rem', color: '#92400e'}}>💡</div>
                  <div>
                    <h4 style={{color: '#92400e', marginBottom: '0.25rem'}}>Today's Wellness Tip</h4>
                    <p style={{color: '#92400e', margin: 0}}>Practice the 4-7-8 breathing technique to reduce anxiety.</p>
                  </div>
                </div>
              </div>

              {/* Community Guidelines */}
              <div style={styles.sidebarCard}>
                <h3 style={{color: '#1e3a8a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>🛡️</span>
                  Community Guidelines
                </h3>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                  <li style={{padding: '0.5rem 0', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: '#10b981'}}>✅</span>Be kind and supportive
                  </li>
                  <li style={{padding: '0.5rem 0', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: '#10b981'}}>✅</span>Respect privacy
                  </li>
                  <li style={{padding: '0.5rem 0', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: '#10b981'}}>✅</span>Share from experience
                  </li>
                  <li style={{padding: '0.5rem 0', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: '#10b981'}}>✅</span>No harassment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Story Modal */}
      {showShareModal && (
        <div style={styles.modalOverlay} onClick={() => setShowShareModal(false)}>
          <div style={styles.shareModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span>✍️</span>
                Share Your Story
              </h2>
              <button 
                style={{background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                onClick={() => setShowShareModal(false)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ×
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Privacy Assurance */}
              <div style={styles.privacyNotice}>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                  <div style={{fontSize: '1.5rem', color: '#1e40af'}}>🛡️</div>
                  <div>
                    <h4 style={{color: '#1e40af', marginBottom: '0.25rem'}}>Your Privacy is Protected</h4>
                    <p style={{color: '#475569', margin: 0}}>
                      Your story will be posted with a random anonymous username. No one can see your real identity.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitPost}>
                {/* Category Selection */}
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem'}}>Category</label>
                  <div style={styles.categoryOptions}>
                    {categories.filter(c => c.key !== 'all').map(cat => (
                      <div key={cat.key} style={{position: 'relative'}}>
                        <input
                          type="radio"
                          id={`cat-${cat.key}`}
                          name="category"
                          value={cat.key}
                          checked={newPost.category === cat.key}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                          style={{display: 'none'}}
                        />
                        <label 
                          htmlFor={`cat-${cat.key}`}
                          style={{
                            ...styles.categoryLabel,
                            background: newPost.category === cat.key ? '#3b82f6' : 'transparent',
                            borderColor: newPost.category === cat.key ? '#3b82f6' : '#e2e8f0',
                            color: newPost.category === cat.key ? 'white' : '#475569'
                          }}
                        >
                          <span style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{cat.icon}</span>
                          <span style={{fontWeight: '600', fontSize: '0.9rem'}}>{cat.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem'}}>Title</label>
                  <input
                    type="text"
                    style={styles.formInput}
                    placeholder="Give your story a meaningful title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    maxLength={200}
                    required
                  />
                  <div style={{color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'right'}}>
                    {newPost.title.length}/200 characters
                  </div>
                </div>

                {/* Story Content */}
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem'}}>Your Story</label>
                  <textarea
                    style={{...styles.formInput, minHeight: '200px', resize: 'vertical'}}
                    rows={6}
                    placeholder="Share your experience, challenges, or insights..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    maxLength={5000}
                    required
                  />
                  <div style={{color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span>{newPost.content.length}/5000 characters</span>
                      <span>Will be posted as: <strong>{generateAnonymousName()}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div style={{marginBottom: '2rem'}}>
                  <label style={{display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer'}}>
                    <div style={{position: 'relative', width: '60px', height: '30px'}}>
                      <input
                        type="checkbox"
                        style={{display: 'none'}}
                        checked={newPost.isAnonymous}
                        onChange={(e) => setNewPost({...newPost, isAnonymous: e.target.checked})}
                      />
                      <div style={{
                        width: '60px',
                        height: '30px',
                        backgroundColor: newPost.isAnonymous ? '#3b82f6' : '#e2e8f0',
                        borderRadius: '15px',
                        position: 'relative',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{
                          position: 'absolute',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          top: '2px',
                          left: newPost.isAnonymous ? '32px' : '2px',
                          transition: 'all 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{fontWeight: 'bold'}}>Post Anonymously</div>
                      <div style={{color: '#64748b', fontSize: '0.85rem'}}>Your identity will remain completely hidden</div>
                    </div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div style={styles.modalFooter}>
                  <button
                    type="button"
                    style={{...styles.primaryBtn, background: 'transparent', color: '#475569', border: '2px solid #e2e8f0'}}
                    onClick={() => setShowShareModal(false)}
                    disabled={isSubmitting}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      ...styles.primaryBtn,
                      opacity: isSubmitting || !newPost.title.trim() || !newPost.content.trim() ? '0.5' : '1',
                      cursor: isSubmitting || !newPost.title.trim() || !newPost.content.trim() ? 'not-allowed' : 'pointer'
                    }}
                    disabled={isSubmitting || !newPost.title.trim() || !newPost.content.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid white',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          marginRight: '0.5rem'
                        }}></div>
                        Sharing...
                      </>
                    ) : (
                      <>
                        <span>📤</span>
                        Share Anonymously
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        style={styles.floatingActionBtn}
        onClick={() => setShowShareModal(true)}
        title="Share your story"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
      >
        ✍️
      </button>

      {/* Add keyframes for spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .mobile-hide {
            display: none;
          }
          .reaction-buttons {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .comment-toggle-btn {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Community;
