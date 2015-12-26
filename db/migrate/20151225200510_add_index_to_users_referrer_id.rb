class AddIndexToUsersReferrerId < ActiveRecord::Migration
  def change
    add_index :users, :referrer_id
  end
end
