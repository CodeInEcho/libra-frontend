import http from '@/lib/request'

export const updateUserInfo = async (info: any) => {
  const { provider, providerAccountId, expires_at, access_token, refresh_token, name, picture } = info;
  let data;
  if (provider === 'twitter') {
    data = {
      twitter: name,
      twitter_icon: picture,
      twitter_token: access_token,
      twitter_id: providerAccountId,
      twitter_refresh_token: refresh_token,
      twitter_expired_timestamp: expires_at,
    }
  } else if (provider === 'discord') {
    data = {
      discord: name,
      discord_token: access_token,
      discord_id: providerAccountId,
      discord_refresh_token: refresh_token,
      discord_expired_timestamp: expires_at,
    }
  }
  const res = await http.post('/auth/update-user', {
    ...data,
    update_type: provider,
  });
  return res && res.data && res.data.code === 200 ? true : false;
}