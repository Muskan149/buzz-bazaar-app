import { decode } from 'base64-arraybuffer'
const { data, error } = await supabase
.storage
.from('avatars')
.upload('public/avatar1.png', decode('base64FileData'), {
contentType: 'image/png'
})