class RemoveAdminFromUserIfFound < ActiveRecord::Migration
  def change
    remove_column(:users, :admin) if User.column_names.include?('admin')
  end
end
