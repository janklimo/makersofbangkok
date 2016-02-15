describe User do
  context 'validations' do
    context 'first_name' do
      context 'valid first name' do
        subject { build(:user, first_name: 'Joe') }
        it { is_expected.to be_valid }
      end
      context 'invalid first name' do
        subject { build(:user, first_name: '') }
        it { is_expected.not_to be_valid }
      end
    end
    context 'last_name' do
      context 'valid last name' do
        subject { build(:user, last_name: 'Joe') }
        it { is_expected.to be_valid }
      end
      context 'invalid last name' do
        subject { build(:user, last_name: '') }
        it { is_expected.not_to be_valid }
      end
    end
    context 'email' do
      context 'valid email' do
        subject { build(:user, email: 'email@gmail.com') }
        it { is_expected.to be_valid }
      end
      context 'invalid email' do
        subject { build(:user, email: '') }
        it { is_expected.not_to be_valid }
      end
    end
    context 'password' do
      context 'valid password' do
        subject { build(:user, password: '1337pass') }
        it { is_expected.to be_valid }
      end
      context 'no password given' do
        subject { build(:user, password: '') }
        it { is_expected.not_to be_valid }
      end
    end
    context 'referrer_id' do
      context 'valid' do
        subject { build(:user, referrer_id: 5) }
        it { is_expected.to be_valid }
      end
      context 'invalid' do
        subject { build(:user, referrer_id: '') }
        it { is_expected.not_to be_valid }
      end
    end
  end
  context 'friends' do
    before do
      @user = create(:user)
      @other_user_1 = create(:user, first_name: 'James', referrer_id: @user.id)
      @other_user_2 = create(:user, referrer_id: 10)
    end
    it 'returns the people referred' do
      expect(@user.friends.size).to eq 1
      expect(@user.friends.first.first_name).to eq 'James'
    end
  end
  context 'rank' do
    before do
      @user1 = create(:user)
      @user2 = create(:user)
      @user3 = create(:user)
      @user2.destroy
    end
    it 'returns the right rank' do
      expect(@user3.reload.rank).to eq 2
    end
  end
end
